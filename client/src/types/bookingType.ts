export type CheckoutSessionRequest = {
  selectedItems: {
    serviceId: string;
    name: string;
    image: string;
    price: string;
    duration: string;
    travelers: string;
  }[];
  bookingDetails: {
    name: string;
    email: string;
    contact: string;
    address: string;
    city: string;
    country: string;
  };
  guideId: string;
};

export interface Bookings extends CheckoutSessionRequest {
  _id: string;
  status: string;
  totalAmount: number;
}

export type BookingState = {
  loading: boolean;
  bookings: Bookings[];
  createCheckOutSession: (
    checkoutSessionRequest: CheckoutSessionRequest
  ) => Promise<void>;
  getBookingDetails: () => Promise<void>;
};
