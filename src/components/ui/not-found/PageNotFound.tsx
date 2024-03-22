import Image from "next/image"
import Link from "next/link"



export const PageNotFound = () => {
  return (
    <div className="flex flex-col-reverse sm:flex-row h-[700px] w-full justify-center items-center align-middle">

      <div className="text-center px-5 mx-5">
        <h2 className="text-8xl antialiased font-medium">404</h2>
        <p className="text-base text-zinc-800">Whooops! It seems this page doesn’t exist</p>
        <p className="font-light">
          <span>You can go back to </span>
          <Link className="font-normal hover:underline transition-all" href="/">homepage</Link>
        </p>
      </div>

      <div className="px-5 mx-5">
        <Image className="p-5 sm:p-0" width={550} height={550} src="/imgs/starman_750x750.png" alt="Starman" />
      </div>
    </div>
  )
}