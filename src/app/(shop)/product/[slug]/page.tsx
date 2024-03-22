export const revalidate = 604800;


import { getProductBySlug } from "@/actions";
import { ProductMobileSlideShow, ProductSlideShow, QuantitySelector, SizeSelector, StockLabel } from "@/components";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";


interface Props {
  params:  {
    slug:string;
  }
}


export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug
 
  // fetch data
  const product = await getProductBySlug(slug)

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? '',
    
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? '',
      images: [`/products/${product?.images[1]}`],
    },
  }
}

export default async function ProductPage({ params }:Props) {

  const { slug } = params;
  const product = await getProductBySlug(slug);

  if(!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">

      <div className="col-span-1 md:col-span-2">

        {/* Mobile Slideshow */}
        <ProductMobileSlideShow className="block md:hidden" title={ product.title } images={ product.images } />
        {/* Desktop Slideshow */}
        <ProductSlideShow className="hidden md:block" title={ product.title } images={ product.images } />

      </div>


      {/* Detalles */}

      <div className="col-span-1 px-5">
        <h1 className="antialiased font-medium text-xl">{product.title}</h1>
        <p className="text-base mb-5">${product.price}</p>
        <StockLabel slug={product.slug} />

      <AddToCart product={ product } />


        {/* Agregar al carrito */}

        <h3 className="text-base">Descripción</h3>
        <p className="font-light text-sm">{product.description}</p>
      </div>

    </div>
  );
}