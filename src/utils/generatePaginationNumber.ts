



export const generatePagination = ( currentPage:number, totalPages:number ) => {
  // Si el número total de páginas es 7 o menos, mostrar todas las páginas sin puntos suspensivos


  if( totalPages <= 7) {
    return Array.from({ length: totalPages }, ( _, i) => i + 1 );

  }

  // Si la página actual está entre las primeras 3 páginas, mostrar las primeras 3, puntos, y las últimas 2

  if( currentPage <= 3 ){ 
    return [1, 2, 3, '...', totalPages - 1, totalPages ];
  }

  // Si la página actual está entre las últimas 3 páginas, mostrar las primeras 2, puntos y las últimas 3 

  if( currentPage >=  totalPages - 2){
    return [1, 2, '...', totalPages - 2, totalPages, -1, totalPages ]
  }

  // Si la pagina actual está en otro lugar del medio, mostrar la primera página, puntos, la página actual, y vecinos

  return [
    1,
    '...',
    currentPage - 1,
    currentPage, 
    currentPage + 1,
    '...',
    totalPages
  ]
}