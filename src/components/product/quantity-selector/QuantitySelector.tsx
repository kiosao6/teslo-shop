'use client'

import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";





interface Props {
  quantity: number;
  onValueChange: (value:number) => void;
}

export const QuantitySelector = ({quantity, onValueChange }: Props) => {


  const onQuantityChange = ( value: number ) => {
    
    // If value is minor than 0 or higher than 5, does nothing at all and return
    if(quantity + value <= 0 || quantity + value > 6 ) return;

    // Sets state
    onValueChange( quantity + value );
    
  };

  return (
    <div className="flex">

      <button onClick={() => onQuantityChange(-1)}>
        <IoRemoveCircleOutline size={ 25 } />
      </button>

      <span className="w-16 mx-3 px-5 bg-gray-200 text-center rounded">
        { quantity }
      </span>
      
      <button onClick={() => onQuantityChange(1)}>
        <IoAddCircleOutline size={ 25 } />
      </button>
    </div>
  )
}