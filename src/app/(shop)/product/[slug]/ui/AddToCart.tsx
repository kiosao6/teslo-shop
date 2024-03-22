'use client'

import { SizeSelector, QuantitySelector } from "@/components"
import type{ CartProduct, Product, Size } from "@/interfaces"
import { useCartStore } from "@/store";
import { useState } from "react";



interface Props {
  product: Product;
}


export const AddToCart = ({ product }:Props) => {

  const addProductToCart = useCartStore(state => state.addProducToCart);

  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);
    if(!size) {
      return; 
    }

    const cartProduct:CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      image: product.images[0]
    }

    addProductToCart(cartProduct)
    resetForm()
  }

  const resetForm = () => {
    setQuantity(1);
    setPosted(false)
    setSize(undefined);
  }





  
  return (
    <>
      {
        ( posted && !size ) && 

          <span className="mt-2 text-red-400 ">
            Debe de seleccionar una talla
          </span>
      }

        


      {/* Selector de Tallas */}
        <SizeSelector
          onSizeChange={ setSize }
          selectedSize={ size }
          availableSizes={ product.sizes }
        />

        {/* Selector de Cantidad */}

        <QuantitySelector quantity={quantity} onValueChange={setQuantity} />

        {/* Agregar al carrito */}
        <button 
          onClick={addToCart}
          className="btn-primary my-5">
          Agregar al Carrito
        </button>
    
    </>
  )
}