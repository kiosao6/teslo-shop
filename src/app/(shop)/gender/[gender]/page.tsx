export const revalidate = 60;


import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { Gender } from "@prisma/client";
import { notFound, redirect } from "next/navigation";



interface Props {
  params: {
    gender:string;
  },
  searchParams: {
    page?: string;
  }
  
}

const seedProducts = initialData.products;
export default async function CategoryPage({params, searchParams}:Props) {
  
  const { gender } = params;
  const page = searchParams.page ? searchParams.page : 1
  // const productsR = seedProducts.filter(product => product.gender === params.gender )
  const labels:Record<string, string> = {
    'men': 'hombres',
    'women': 'mujeres',
    'kid': 'niños',
    'unisex': 'todos'
  }


  // if( id === 'kids' ) { 
  //   notFound(); // <----- this function executes not-found.tsx file 
  // }

  const { totalPages, products } = await getPaginatedProductsWithImages({ page: +page, gender:gender as Gender})

  if(products.length === 0) {
    redirect(`/gender/${gender}`);
  };

  return (
    <>
      <Title title={`Artículos de ${ labels[gender] }`} subtitle={params.gender} />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages}  />
    </>
  );
}