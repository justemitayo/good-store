'use client'
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import { AddCartItem, CartItem } from '../types/cart';

interface State {
  cart: CartItem[];
};

interface Action {
  addToCart: (item: AddCartItem) => void;
  removeFromCart: (cartId: string) => void;
  clearCart: () => void;
  increaseQty: (cartId: string) => void;
  decreaseQty: (cartId: string) => void;
}



export const useCartStore = create<State & Action, 
[['zustand/persist', unknown]]> (
  persist(
    set => ({
      cart: [],
      addToCart: (item) => {
        set((state) => {
          const existingItems = state.cart.find((user) => user._id === item._id);
          if(existingItems) {
            const exists = item.option.length === existingItems.option.length && item.option.every((options) => {
              const matchedOptions = existingItems.option.find((value) => value.title === options.title);

              return matchedOptions?.value === options.value
            });
            if(exists) {
              return {
                cart: state.cart.map((value) => {
                  if(value.cartId === existingItems.cartId) {
                    return ({
                      ...value, 
                      cartQuantity: value.cartQuantity + 1
                    })
                  }
                  return value
                })
              }
            }
          } 
          const newItem = {
            ...item,
            cartId: crypto.randomUUID()
          }
          return {
            cart: [...state.cart, newItem ]
          }
          

        })
      },
      removeFromCart: (cartId) => {
        set((state) => ({
            cart: state.cart.filter((value) => value.cartId !== cartId)
        }))
      },

      increaseQty: (cartId) => {
        set((state) => {
          const existingItems = state.cart.find((value) => value.cartId === cartId);
          if(existingItems) {
            return{
            cart: state.cart.map((value) => {
              if(value.cartId === existingItems.cartId) {
                return {
                    ...value,
                    cartQuantity: value.cartQuantity + 1
                };
              }
              return value
            })
            }
          }
          return {}
        })
      },
      decreaseQty: (cartId) => {
        set((state) => {
          const existingItems = state.cart.find((value) => value.cartId === cartId);
          if (!existingItems) return {}
          if(existingItems.cartQuantity === 1) {
            return {
              cart: state.cart.filter((val) => val.cartId !== cartId )
            }
          }
          return {
            cart: state.cart.map((value) => {
              if(value.cartId === cartId) {
                return {
                  ...value,
                  cartQuantity: value.cartQuantity - 1
                }
              }

              return value
            })
          }
        })
      },
      clearCart: () => {
        set(() => ({
          cart: []
        }))
      }
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)

