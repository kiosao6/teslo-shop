

'use server'

import prisma from '@/lib/prisma';


export const getStockBySlug = async( slug: string ):Promise<number> => {
  try { 
    const stock = await prisma.product.findFirst({
      select: {
        inStock: true
      },
      where: {
        slug: slug,
      }
    })
    
    return stock?.inStock ?? 0


  } catch (error) {
    console.log(error);
    throw new Error('No se pudo encontrar esta vaina')
  }
}

