import { CartState } from "@/types/cartTypes";
import { ServicesItem } from "@/types/guideType";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (item: ServicesItem) => {
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem._id === item._id
          );
          if (existingItem) {
            return {
              cart: state?.cart.map((cartItem) =>
                cartItem._id === item._id
                  ? { ...cartItem, duration: cartItem.duration + 1 }
                  : cartItem
              ),
            };
          } else {
            return {
              cart: [...state.cart, { ...item, duration: 1, travelers: 1 }],
            };
          }
        });
      },
      clearCart: () => {
        set({ cart: [] });
      },
      removeFromTheCart: (id: string) => {
        set((state) => ({
          cart: state.cart.filter((item) => item._id !== id),
        }));
      },
      incrementDuration: (id: string) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item._id === id ? { ...item, duration: item.duration + 1 } : item
          ),
        }));
      },
      decrementDuration: (id: string) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item._id === id && item.duration > 1
              ? { ...item, duration: item.duration - 1 }
              : item
          ),
        }));
      },
      incrementTraveler: (id: string) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item._id === id ? { ...item, travelers: item.travelers + 1 } : item
          ),
        }));
      },
      decrementTraveler: (id: string) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item._id === id && item.travelers > 1
              ? { ...item, travelers: item.travelers - 1 }
              : item
          ),
        }));
      },
    }),
    {
      name: "cart-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
