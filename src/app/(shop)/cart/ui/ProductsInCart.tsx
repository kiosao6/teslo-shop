'use client'

import { QuantitySelector } from "@/components";
import { useCartStore } from "@/store"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";




export const ProductsInCart = () => {

  const productsInCart = useCartStore(state => state.cart);
  const removeProduct = useCartStore(state => state.removeProduct)
  const updateProductQuantity = useCartStore(state => state.updateProductQuantity);
  const [loaded, setLoaded] = useState(false);

  const router = useRouter()

  // const onValueChange = (value: number) => {
  //   updateProductQuantity()
  // }

  useEffect(() => {
    setLoaded(true)
  }, [])

  if(!loaded) {
    return (
      <p>Loading...</p>
    )
  }

  
  return (
    <>
      {
        productsInCart.map(product => (
          <div key={`${product.slug}-${product.size}`} className="flex mb-5">
            <Image
              className="mr-5 rounded"
              alt={product.title}
              width={100}
              height={100}
              style={{
                width: '100px',
                height: '100px'
              }}
              src={`/products/${product.image}`}
              />

            <div>
              <Link
                className="hover:underline"
                href={`/product/${product.slug}`}>
                {product.size} - {product.title}
              </Link>
              <p>${product.price}</p>
              <QuantitySelector quantity={product.quantity} onValueChange={(value) => updateProductQuantity(product, value)} />
              <button
                onClick={() => {
                  removeProduct(product)
                  router.refresh()
                }}
                className="underline mt-3">
                Remover
              </button>
            </div>
            
          </div>

        ))
      }

    </>
  )
}