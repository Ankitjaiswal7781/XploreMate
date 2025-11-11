import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useBookingStore } from "@/store/useBookingStore";
import { useEffect } from "react";
import { CartItem } from "@/types/cartTypes";

const Success = () => {
  const { bookings, getBookingDetails } = useBookingStore();

  useEffect(() => {
    getBookingDetails();
  }, [getBookingDetails]);

  if (bookings.length === 0)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="font-bold text-2xl text-gray-700 dark:text-gray-300">
          Bookings not Found!
        </h1>
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-2xl w-full space-y-6">
        {bookings.map((booking: any) => (
          <div
            key={booking._id}
            className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            <div className="text-center mb-4">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                Booking Status:{" "}
                <span className="text-[#7d239b]">
                  {booking.status.toUpperCase()}
                </span>
              </h1>
            </div>
            <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-4">
              Booking Summary
            </h2>
            {booking.selectedItems.map((item: CartItem) => (
              <div key={item._id} className="mb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt=""
                      className="w-14 h-14 rounded-md object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <h3 className="ml-4 text-gray-800 dark:text-gray-200 font-medium">
                      {item.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-medium text-gray-800 dark:text-gray-200">
                      Rs.{item.price}
                    </span>
                  </div>
                </div>
                <Separator className="my-4" />
              </div>
            ))}
          </div>
        ))}
        <div className="mt-6 flex justify-center">
          <Link to="/booking-summary" className="w-full">
            <Button className="bg-purple hover:bg-hoverPurple w-full py-3 rounded-md shadow-lg text-lg font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
              Continue Exploring
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Success;
