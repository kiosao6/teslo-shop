
'use client'

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions } from "@paypal/paypal-js"
import { setTransactinoId, paypalCheckPayment } from "@/actions";

interface Props {
  orderId: string;
  amount: number;
}

export const PaypalButton = ({orderId, amount}: Props) => {

  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmount = (Math.round(amount * 100)) / 100

  if(isPending) {
    return (
      <div className="animate-pulse">
        <div className="h-10 bg-gray-300 rounded"></div>
        <div className="h-10 bg-gray-300 rounded mt-3"></div>
      </div>
    )
  }

  const createOrder = async(data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {

    const transactionId = await actions.order.create({
      intent: "CAPTURE", // o "AUTHORIZE" según tu caso
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            currency_code: "USD", // Cambia esto según tu moneda
            value: `${roundedAmount}`,
          }
        }
      ]
    });

    const {ok} = await setTransactinoId(orderId, transactionId)

    if(!ok){
      throw new Error('No se pudo actualizar la orden')
    }

    console.log(transactionId);

    return transactionId

    

  }

  const onApprove = async(data: OnApproveData, actions: OnApproveActions) => {
    
    const details = await actions.order?.capture();
    if ( !details ) return;

    await paypalCheckPayment( details.id! );

  }


  return (
    <>
      <PayPalButtons
        createOrder={ createOrder}
        onApprove={onApprove}
      />
    </>
  )
}