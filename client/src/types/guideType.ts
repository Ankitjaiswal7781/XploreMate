import { Bookings } from "./bookingType";

export type ServicesItem = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export type Guide = {
  _id: string;
  user: string;
  guideName: string;
  city: string;
  country: string;
  tourDuration: number;
  servicesTypes: string[];
  services: ServicesItem[];
  imageUrl: string;
};

export type SearchedGuide = {
  data: Guide[];
};

export type GuideState = {
  loading: boolean;
  guide: Guide | null;
  searchedGuide: SearchedGuide | null;
  appliedFilter: string[];
  singleGuide: Guide | null;
  guideBooking: Bookings[];
  createGuide: (formData: FormData) => Promise<void>;
  getGuide: () => Promise<void>;
  updateGuide: (formData: FormData) => Promise<void>;
  searchGuide: (
    searchText: string,
    searchQuery: string,
    selectedServiceTypes: any
  ) => Promise<void>;
  addServicesToGuides: (services: ServicesItem) => void;
  updateServicesToGuides: (services: ServicesItem) => void;
  setAppliedFilter: (value: string) => void;
  resetAppliedFilter: () => void;
  getSingleGuide: (guideId: string) => Promise<void>;
  getGuideBookings: () => Promise<void>;
  updateGuideBooking: (bookingId: string, status: string) => Promise<void>;
};
