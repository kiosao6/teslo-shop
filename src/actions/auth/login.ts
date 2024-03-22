'use server'

import { signIn } from '@/auth.config';
import { AuthError } from 'next-auth';
 
// ...
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {

    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return 'Success'


  } catch (error) {

    console.log(error)
    return 'Error desconocido'

  }
}

export const login = async(email: string, password: string) => {



  try {
    
    await signIn('credentials', { email, password })
    return {
      ok: true
    }

  } catch (error) {
    console.log({error})
    return {
      ok: false,
      message: ' no se pudo iniciar sesion'
    }
  }
}