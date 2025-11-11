import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGuideStore } from "@/store/useGuideStore";
import { useEffect } from "react";

const Bookings = () => {
  const { guideBooking, getGuideBookings, updateGuideBooking } =
    useGuideStore();
  const handleStatusChange=async(id:string, status:string)=>{
    await updateGuideBooking(id, status);
  }
  useEffect(() => {
    getGuideBookings();
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-16 px-6 mt-20">
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-12 text-center">
        Bookings Overview
      </h1>
      {/* Guide bookings display */}
      <div className="space-y-8">
        {guideBooking.map((booking) => (
          <div key={booking._id} className="transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl flex flex-col md:flex-row justify-between items-start sm:items-center bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex-1 mb-6 sm:mb-0">
              <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                {booking.bookingDetails.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                <span className="font-semibold">Address: </span>
                {booking.bookingDetails.address}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                <span className="font-semibold">Total Amount: </span>
                Rs.{booking.totalAmount ? booking.totalAmount : "N/A"}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                <span className="font-semibold">Booked On: </span>
                {new Intl.DateTimeFormat("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                }).format(new Date(booking.createdAt))}
              </p>
            </div>
            <div className="w-full sm:w-1/3">
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Booking Status
              </Label>
              <Select onValueChange={(newStatus)=>handleStatusChange(booking._id, newStatus)} defaultValue={booking.status}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {[
                      "Pending",
                      "Confirmed",
                      "Preparing",
                      "InProgress",
                      "Completed",
                    ].map((status: string, index: number) => (
                      <SelectItem key={index} value={status.toLowerCase()}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Bookings;
