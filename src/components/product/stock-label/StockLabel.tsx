'use client'

import { getStockBySlug } from "@/actions/products/get-stock-by-slug";
import { useEffect, useState } from "react";


interface Props {
    slug: string
}




export const StockLabel = ({ slug }:Props) => {

  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);


  
  useEffect(() => {
    const getStock = async() => {
      const inStock = await getStockBySlug(slug);
      setStock(inStock)
      setIsLoading(false);
    }
    getStock()
  }, [slug])

  



  return (
    <>

      {
        isLoading ? 
          <h1 className="antialiased font-medium text-sm animate-pulse bg-gray-300 rounded-sm w-fit px-2 py-1">
            Getting stock...
          </h1>
          : 
          <h1 className="antialiased font-medium text-sm">
            Stock: { stock }
          </h1>

      }
      

    </>
  )
}