import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useGuideStore } from "./useGuideStore";

const API_END_POINT = "http://localhost:8000/api/v1/services";
axios.defaults.withCredentials = true;

type ServiceState = {
  loading: boolean;
  services: null;
  createServices: (formData: FormData) => Promise<void>;
  editServices: (servicesId: string, formData: FormData) => Promise<void>;
};

export const useServiceStore = create<ServiceState>()(
  persist(
    (set) => ({
      loading: false,
      services: null,
      createServices: async (formData: FormData) => {
        try {
          set({ loading: true });
          console.log([...formData.entries()]);
          const response = await axios.post(`${API_END_POINT}/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, services: response.data.service });
            //update guide
            useGuideStore.getState().addServicesToGuides(response.data.service);
          }
        } catch (error: any) {
          toast.error(error.response.data.message);
          set({ loading: false });
        }
      },
      editServices: async (servicesId: string, formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.put(
            `${API_END_POINT}/${servicesId}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, services: response.data.service });
          }
          //update guide services
          useGuideStore
            .getState()
            .updateServicesToGuides(response.data.service);
        } catch (error: any) {
          toast.error(error.response.data.message);
          set({ loading: false });
        }
      },
    }),
    {
      name: "services-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
