import { Bookings } from "@/types/bookingType";
import { GuideState, ServicesItem } from "@/types/guideType";
import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const API_END_POINT = "http://localhost:8000/api/v1/guide";
axios.defaults.withCredentials = true;

export const useGuideStore = create<GuideState>()(
  persist(
    (set, get) => ({
      loading: false,
      guide: null,
      searchedGuide: null,
      appliedFilter: [],
      singleGuide: null,
      guideBooking: [],
      createGuide: async (formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false });
          }
        } catch (error: any) {
          toast.error(error.response.data.message);
          set({ loading: false });
        }
      },
      getGuide: async () => {
        try {
          set({ loading: true });
          const response = await axios.get(`${API_END_POINT}/`);
          if (response.data.success) {
            set({ loading: false, guide: response.data.guide });
          }
        } catch (error: any) {
          if (error.response.status === 404) {
            set({ guide: null });
          }
          set({ loading: false });
        }
      },
      updateGuide: async (formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.put(`${API_END_POINT}/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false });
          }
        } catch (error: any) {
          toast.error(error.response.data.message);
          set({ loading: false });
        }
      },
      searchGuide: async (
        searchText: string,
        searchQuery: string,
        selectedServiceTypes: any
      ) => {
        try {
          set({ loading: true });
          const params = new URLSearchParams();
          params.set("searchQuery", searchQuery);
          params.set("selectedServiceTypes", selectedServiceTypes.join(","));

          const response = await axios.get(
            `${API_END_POINT}/search/${searchText}?${params.toString()}`
          );
          if (response.data.success) {
            set({ loading: false, searchedGuide: response.data });
          }
        } catch (error) {
          set({ loading: false });
        }
      },
      addServicesToGuides: (services: ServicesItem) => {
        set((state: any) => ({
          guide: state.guide
            ? { ...state.guide, services: [...state.guide.services, services] }
            : null,
        }));
      },
      updateServicesToGuides: (updatedServices: ServicesItem) => {
        set((state: any) => {
          if (state.guide) {
            const updatedServicesList = state.guide.services.map(
              (service: any) =>
                service._id === updatedServices._id ? updatedServices : service
            );
            return {
              guide: {
                ...state.guide,
                services: updatedServicesList,
              },
            };
          }
          return state;
        });
      },
      setAppliedFilter: (value: string) => {
        set((state) => {
          const isAlreadyApplied = state.appliedFilter.includes(value);
          const updatedFilter = isAlreadyApplied
            ? state.appliedFilter.filter((item) => item !== value)
            : [...state.appliedFilter, value];
          return { appliedFilter: updatedFilter };
        });
      },
      resetAppliedFilter: () => {
        set({ appliedFilter: [] });
      },
      getSingleGuide: async (guideId: string) => {
        try {
          const response = await axios.get(`${API_END_POINT}/${guideId}`);
          if (response.data.success) {
            set({ singleGuide: response.data.guide });
          }
        } catch (error) {}
      },
      getGuideBookings: async () => {
        try {
          const response = await axios.get(`${API_END_POINT}/booking`);
          console.log("API Response:", response.data);
          if (response.data.success) {
            set({ guideBooking: response.data.bookings });
          }
        } catch (error) {
          console.log(error);
        }
      },
      updateGuideBooking: async (bookingId: string, status: string) => {
        try {
          const response = await axios.put(
            `${API_END_POINT}/booking/${bookingId}/status`,
            { status },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data.success) {
            const updatedBooking = get().guideBooking.map(
              (booking: Bookings) => {
                return booking._id === bookingId
                  ? { ...booking, status: response.data.status }
                  : booking;
              }
            );
            set({ guideBooking: updatedBooking });
            toast.success(response.data.message);
          }
        } catch (error: any) {
          toast.error(error.response.data.message);
        }
      },
    }),
    {
      name: "guide-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
