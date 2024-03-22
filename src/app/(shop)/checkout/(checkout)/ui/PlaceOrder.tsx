
'use client'

import { placeOrder } from "@/actions"
import { useAddressStore, useCartStore } from "@/store"
import { currencyFormat } from "@/utils"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


export const PlaceOrder = () => {
  const router = useRouter();
  const { itemsInCart, tax, total, subTotal } = useCartStore(state => state.getSummaryInformation())
  const address = useAddressStore(state => state.address);
  const cart = useCartStore(state => state.cart);
  const clearCart = useCartStore( state => state.clearCart)
  


  const [loaded, setLoaded] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);


  const onPlaceOrder = async() => {
    setIsPlacingOrder(true)

    const productsToOrder = cart.map( product =>  ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }))

   console.log({address, productsToOrder})

    const resp = await placeOrder(productsToOrder, address)

    if(!resp.ok) {
      setIsPlacingOrder(false)
      setErrorMessage(resp.message)
      return 
    }

    // En este punto ya todo salió bien

    clearCart();
    router.replace('/orders/' + resp.order!.id);


  }


  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) {
    return (
      <p>Cargando...</p>
    )
  }



  return (
    <div className="bg-white rounded-xl shadow-xl p-7">

      <h2 className="text-2xl mb-2 font-medium tracking-tight">Dirección de entrega</h2>
      <div className="mb-10">
        <p>{address.firstName} {address.lastName}</p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.postalCode}</p>
        <p>{address.city} - {address.country}</p>
        <p>{address.phone} </p>
      </div>

      <div className="w-full h-[0.5px] bg-gray-200 mb-10 rounded" />

      <h2 className="text-2xl mb-2 tracking-tight">Resumen de la orden</h2>
      <div className="grid grid-cols-2">
        <span>No. Products</span>
        <span className="text-right">{(itemsInCart)} Productos</span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>

        <span>Impuestos(15%)</span>
        <span className="text-right">{currencyFormat(tax)}</span>

        <span className="text-2xl mt-5">Total:</span>
        <span className="text-right mt-5 text-2xl">{currencyFormat(total)}</span>
      </div>

      <div className="mt-5 mb-2 w-full">
        {/* Disclaimer */}
        <span className="text-xs">
          Al hacer click en &quot;Colocar orden&quot;, aceptas nuestro términos y condiciones
        </span>

        <p className="text-red-500">{errorMessage}</p>
        <button
          // href="/orders/123"
          onClick={ onPlaceOrder }
          className={
            clsx({
              'btn-primary': !isPlacingOrder,
              'btn-disabled': isPlacingOrder
            })
          }>
          Colocar orden
        </button>
      </div>
    </div>
  )
}