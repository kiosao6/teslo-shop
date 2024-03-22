
'use client'

import { login, registerUser } from "@/actions";
import clsx from "clsx";
import Link from "next/link"
import { useState } from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  name:string;
  email: string;
  password: string;
}


export const RegisterForm = () => {


  const { register, handleSubmit, formState: {errors} } = useForm<Inputs>()
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = async(data: Inputs) => {
    setErrorMessage('')
    

    const { name, email, password } = data;
    // server action
    const res = await registerUser(name, email, password);

    if(!res.ok) {
      setErrorMessage(res.message);
      return;
    }

    await login(email.toLowerCase(), password);

    window.location.replace('/')


    
    
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        {
          errors.name?.type === 'required' && (
            <span className="text-red-500">El nombre es obligatorio</span>
          )
        }
        <label htmlFor="email">Nombre completo</label>
        <input
          {...register('name', {required: true}) }
          className={
            clsx(
              "px-5 py-2 border bg-gray-300 rounded mb-5",
              {
                'border-red-500': errors.name
              }
            )
          }
          type="text" />

        <label htmlFor="email">Correo electrónico</label>
        <input
          {...register('email', {required: true, pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/})}
          className={
            clsx(
              "px-5 py-2 border bg-gray-300 rounded mb-5",
              {
                'border-red-500': errors.email
              }
            )
          }
          type="email" />


        <label htmlFor="email">Contraseña</label>
        <input
          {...register('password', {required: true})}
          className={
            clsx(
              "px-5 py-2 border bg-gray-300 rounded mb-5",
              {
                'border-red-500': errors.password
              }
            )
          }
          type="password" />

        <button
          
          className="btn-primary">
          Crear cuenta
        </button>


        {/* divisor l ine */ }
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link
          href="/auth/login" 
          className="btn-secondary text-center">
          ingresar
        </Link>

      </form>
  )
}