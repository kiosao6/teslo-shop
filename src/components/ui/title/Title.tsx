

interface Props {
  title:string;
  subtitle?:string;
  className?:string;

}
export const Title = ({ title, subtitle, className }:Props) => {
  return (
    <div className={`mt-3 ${className}`}>
      <h1 className="text-4xl antialiased font-medium my-10 tracking-tight">{ title }</h1>
      {
        subtitle && (
          <h3 className="text-xl mb-10">{subtitle}</h3>
        )
      }
    </div>
  )
}