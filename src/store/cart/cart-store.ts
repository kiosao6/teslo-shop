import type { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";




interface State {
  cart: CartProduct[];

  addProducToCart: (product: CartProduct) => void;
  getTotalItems:() => number;

  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  };
  
  updateProductQuantity:(product:CartProduct, quantity: number) => void;
  removeProduct: (product:CartProduct) => void;
  clearCart: () => void;


  // Add product to cart
  // Update producto quantity
  // remove product 
}

export const useCartStore = create<State>()(devtools(
  
  persist(
    (set, get) => ({

      cart: [],

      // Methods

      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      getSummaryInformation: () => {
        const { cart } = get();
        const subTotal = cart.reduce((total, product) => (product.quantity * product.price) + total, 0 )
        const tax = subTotal * 0.15
        const total = subTotal + tax

        const itemsInCart = cart.reduce((total, item) => item.quantity + total, 0)

        return {
          subTotal, 
          tax, 
          total,
          itemsInCart
        }
      },
    
    
      addProducToCart: (product: CartProduct) => {
    
        const { cart } = get()
    
        // 1. Revisar si el producto existe en el carrito 
        const productInCart = cart.some((item) => item.id === product.id && item.size === product.size)
    
        // 2. Si el producto no existe, lo añadimos al carrito 
        if(!productInCart){
          set({ cart: [...cart, product]})
          return;
        }
    
        // 3. Si el producto con su talla existe, hay que actualizar la cantidad
        const updatedCartProduct = cart.map(item => {
          if( item.id === product.id && item.size === product.size ){
            return { ...item, quantity: item.quantity + product.quantity }
          }
    
          return item;
        });
    
        set({ cart: updatedCartProduct })
      },

      updateProductQuantity: (product: CartProduct, quantity: number ) => {
        const { cart } = get();
        const updatedProduct = cart.map(item => {
          if(item.id === product.id && item.size === product.size) {
            return{ ...item, quantity:quantity}
          }
          return item
        });
        
        set({ cart: updatedProduct});
      },

      removeProduct: (product:CartProduct) => {
        const { cart } = get();
        const updatedCart = cart.filter( item => item.id !== product.id || item.size !== product.size);
        console.log(updatedCart)
        set({ cart: updatedCart })
      },

      clearCart: () => {
        set({cart: []})
      }
    }),


    
    {
      name: 'shopping-cart',
    }
  )

))