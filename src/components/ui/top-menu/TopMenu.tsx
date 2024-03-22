
'use client'

import Link from "next/link"
import { IoCartOutline, IoSearchOutline } from "react-icons/io5"
import { MenuButton } from "./MenuButton";
import { useCartStore } from "@/store";
import { useEffect, useState } from "react";



export const TopMenu = () => {

  const totalItemsInCart = useCartStore(state => state.getTotalItems())
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, [])
  


  return (
    <nav className="flex px-5 justify-between items-center w-full">
      {/* Logo */}
      <div>
        <Link
          href="/">
            <span className="font-semibold text-xl">Teslo</span>
            <span>|Shop</span>
        </Link>
      </div>

      {/* CenterMenu */}
      <div className="hidden sm:block">
        <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/men">Hombres</Link>
        <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/women">Mujeres</Link>
        <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/kid">Niños</Link>
      </div>

      {/* Menu */}

      <div className="flex items-center">

        <Link href="/search" className="mx-2">
          <IoSearchOutline className="w-5 h-5" />
        </Link>

        <Link
          href={(totalItemsInCart === 0 && loaded)  ? '/empty' : '/cart'}
          className="mx-2">
          <div className="relative">
            {
              (loaded && totalItemsInCart > 0) && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-1 font-bold">{totalItemsInCart}</span>
              )
            }
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>

        <MenuButton />
      </div>


    </nav>
  )
}