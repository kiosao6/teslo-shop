



'use client'

import { useCartStore } from "@/store"
import { currencyFormat } from "@/utils"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const OrderSummary = () => {
  const { itemsInCart, tax, total, subTotal } = useCartStore(state => state.getSummaryInformation())

  const [loaded, setLoaded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setLoaded(true);
  }, [])

  useEffect(() => {
    if(itemsInCart === 0 && loaded) {
      router.replace('/empty')
    }
  }, [itemsInCart, loaded, router])

  if(!loaded) {
    return (
      <p>Loading</p>
    )
  }
  


  return (
    <div className="grid grid-cols-2">
      <span>No. Products</span>
      <span className="text-right">{currencyFormat(itemsInCart)} Productos</span>

      <span>Subtotal</span>
      <span className="text-right">{currencyFormat(subTotal)}</span>

      <span>Impuestos(15%)</span>
      <span className="text-right">{currencyFormat(tax)}</span>

      <span className="text-2xl mt-5">Total:</span>
      <span className="text-right mt-5 text-2xl">{currencyFormat(total)}</span>
    </div>
  )
}