import { BookingState, CheckoutSessionRequest } from "@/types/bookingType";
import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const API_END_POINT: string = "http://localhost:8000/api/v1/booking";
axios.defaults.withCredentials = true;

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      loading: false,
      bookings: [],
      createCheckOutSession: async (
        checkoutSession: CheckoutSessionRequest
      ) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_END_POINT}/checkout/create-checkout-session`,
            checkoutSession,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          window.location.href = response.data.session.url;
          set({ loading: false });
        } catch (error) {
          set({ loading: false });
        }
      },
      getBookingDetails: async () => {
        try {
          set({ loading: true });
          const response = await axios.get(`${API_END_POINT}/`);
          set({ loading: false, bookings: response.data.bookings });
        } catch (error) {
          set({ loading: false });
        }
      },
    }),
    {
      name: "booking-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
