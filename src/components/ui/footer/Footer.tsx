import Link from "next/link"




export const Footer = () => {
  return (
    <div className="flex w-full text-xs justify-center mb-10">
      <Link href="/" >
        <span>Teslo </span>
        <span>Shop </span>
        <span>{new Date().getFullYear()}</span>
      </Link>

      <Link href="/" className="mx-3" >
        Privacidad
      </Link>

      <Link href="/" className="mx-3" >
        Ubicaciones
      </Link>


    </div>
  )
}