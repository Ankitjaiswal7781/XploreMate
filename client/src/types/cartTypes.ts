import { ServicesItem } from "./guideType";

export interface CartItem extends ServicesItem {
  duration: number;
  travelers: number;
}

export type CartState = {
  cart: CartItem[];
  addToCart: (item: ServicesItem) => void;
  clearCart: () => void;
  removeFromTheCart: (id: string) => void;
  incrementDuration: (id: string) => void;
  decrementDuration: (id: string) => void;
  incrementTraveler: (id: string) => void;
  decrementTraveler: (id: string) => void;
};
