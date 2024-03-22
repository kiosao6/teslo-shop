import { getOrdersByUser } from "@/actions";
import { getOrderById } from "@/actions/order/get-order-by-id";
import { PaypalButton, Title } from "@/components";
import { currencyFormat } from "@/utils";
import Image from "next/image";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";


interface Props {
  params: {
    id: string;
  }
}

export default async function CartPage({ params }: Props) {

  const { } = await getOrdersByUser()

  const { id } = params;

  const { order, ok } = await getOrderById(id);

  if (!ok) {
    redirect('/')
  }

  const address = order!.OrderAddress;



  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden #${id.split('-').at(-1)}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <div className={`flex items-center rounded-lg py-2 px-3.5 text-xs text-white mb-5 ${!order!.isPaid ? 'bg-red-400' : 'bg-green-700'}`}>
              <IoCardOutline size={25} />
              <span className="mx-2">{order?.isPaid ? 'Pagada' : 'No pagada'}</span>
            </div>


            {/* Items del carrito */}
            {
              order!.OrderItem.map(item => (
                <div key={item.product.slug + '- ' + item.size} className="flex mb-5">
                  <Image
                    className="mr-5 rounded"
                    alt={item.product.title}
                    width={100}
                    height={100}
                    style={{
                      width: '100px',
                      height: '100px'
                    }}
                    src={`/products/${item.product.ProductImage[0].url}`}
                  />

                  <div>
                    <p>{item.product.title}</p>
                    <p>${item.price} x {item.quantity}</p>
                    <p className="font-medium">Subtotal:{currencyFormat(item.price * item.quantity)}</p>

                    <button className="underline mt-3">
                      Remover
                    </button>
                  </div>
                </div>
              ))
            }
          </div>

          {/* Checkout */}

          <div className="bg-white rounded-xl shadow-xl p-7">

            <h2 className="text-2xl mb-2 font-medium tracking-tight">Dirección de entrega</h2>
            <div className="mb-10">
              <p>{address!.firstName} {address!.lastName}</p>
              <p>{address!.address}</p>
              <p>{address!.address2}</p>
              <p>{address!.postalCode}</p>
              <p>{address!.city} - {address!.countryId}</p>
              <p>{address!.phone} </p>
            </div>

            <div className="w-full h-[0.5px] bg-gray-200 mb-10 rounded" />

            <h2 className="text-2xl mb-2 tracking-tight">Resumen de la orden</h2>
            <div className="grid grid-cols-2">
              <span>No. Products</span>
              <span className="text-right">{order?.itemsInOrder} Productos</span>

              <span>Subtotal</span>
              <span className="text-right">{currencyFormat(order!.subTotal)}</span>

              <span>Impuestos(15%)</span>
              <span className="text-right">{currencyFormat(order!.tax)}</span>

              <span className="text-2xl mt-5">Total:</span>
              <span className="text-right mt-5 text-2xl">{currencyFormat(order!.total)}</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              {/* Disclaimer */}

              {
                order?.isPaid ? (
                  <div className={`flex items-center rounded-lg py-2 px-3.5 text-xs text-white mb-5 ${!order!.isPaid ? 'bg-red-400' : 'bg-green-700'}`}>
                    <IoCardOutline size={25} />
                    <span className="mx-2">{order?.isPaid ? 'Pagada' : 'No pagada'}</span>
                  </div>
                ) : (
                  <PaypalButton
                    amount={order!.total}
                    orderId={order!.id}
                  />
                )
              }


            </div>
          </div>

        </div>
      </div>


    </div>
  );
}