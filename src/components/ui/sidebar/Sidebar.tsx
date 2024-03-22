'use client'

import { logout } from "@/actions";
import { useUiStore } from "@/store";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link"
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonCircleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5"


interface Props {
  href: string;
}

export const Sidebar = () => {


  // Store actions below 

  const isSideMenuOpen = useUiStore(state =>  state.isSideMenuOpen);
  const closeSideMenu = useUiStore(state => state.closeSideMenu);
  const { data: session } = useSession();
  
  const isAuthenticated = !!session?.user;

  const isAdmin = session?.user.role === 'admin'





  return (
    <div className="">

      {/* Bg black */}
      {
        isSideMenuOpen && (
          <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black/30" />
        )
      }

      {/* Blurred Bg */}
      {
        isSideMenuOpen && (
          <div onClick={closeSideMenu} className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm" />
        )
      }

      {/* SideMenu */}
      <nav
        className={
          clsx(
            "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
            {
              "translate-x-full": !isSideMenuOpen
            }
          )
        }>

        <IoCloseOutline
          onClick={closeSideMenu}
          size={25}
          className="absolute top-5 right-5 cursor-pointer"
        />

        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-300"
            placeholder="Search"
            type="text" />
        </div>

        {/* Menu */}

        {
          isAuthenticated && (
            <>
              <Link href="/profile"
                onClick={closeSideMenu}
                className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
              >
                <IoPersonOutline size={25} />
                <span className="ml-3 text-xl">Perfil</span>
              </Link>

              <Link href="/orders"
                onClick={closeSideMenu}
                className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
              >
                <IoTicketOutline size={25} />
                <span className="ml-3 text-xl">Órdenes</span>
              </Link>
            </>

          )
        }

        {
          isAuthenticated && (
            <button
              onClick={() => logout()}
              className="flex w-full items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoLogOutOutline size={25} />
              <span className="ml-3 text-xl">Salir</span>
            </button>
          )
        }

        {
          !isAuthenticated && (
            <Link href="/auth/login"
              onClick={closeSideMenu}
              className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoLogInOutline size={25} />
              <span className="ml-3 text-xl">Ingresar</span>
        </Link>
          )
        }

        

        

        {/* Line Separator */}

        {
          isAdmin && ( 
            <>
              <div className="w-full h-px bg-gray-200 my-10"/>


              <Link href="/admin/products"
                onClick={closeSideMenu}
                className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
              >
                <IoShirtOutline size={25} />
                <span className="ml-3 text-xl">Productos</span>
              </Link>

              <Link href="/admin/orders"
                onClick={closeSideMenu}
                className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
              >
                <IoTicketOutline size={25} />
                <span className="ml-3 text-xl">Órdenes</span>
              </Link>

              <Link href="/admin/users"
                onClick={closeSideMenu}
                className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
              >
                <IoPeopleOutline size={25} />
                <span className="ml-3 text-xl">Usuarios</span>
              </Link>
            </>
          )
        }

      </nav>

    </div>
  )
}