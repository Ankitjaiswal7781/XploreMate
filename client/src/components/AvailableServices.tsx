import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { ServicesItem } from "@/types/guideType";
import { useCartStore } from "@/store/useCartStore";
import { useNavigate } from "react-router-dom";

const AvailableMenu = ({ services }: { services: ServicesItem[] }) => {
  const { addToCart } = useCartStore();
  const navigate = useNavigate();
  return (
    <div className="md:p-4">
      <h1 className="text-xl md:text-3xl font-extrabold mb-6 text-center">
        Available services
      </h1>
      <div className="grid md:grid-cols-3 gap-6">
        {services.map((service: ServicesItem, index) => (
          <Card
            key={index}
            className="group max-w-xs mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white transition-colors duration-300 group-hover:text-[#560d4a] dark:group-hover:text-[#a02b8f]">
                {service.name}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                {service.description}
              </p>
              <h3 className="text-lg font-semibold mt-4">
                Price:{" "}
                <span className="text-[#7d239b]">Rs.{service.price}/hr </span>
              </h3>
            </CardContent>
            <CardFooter className="p-4">
              <Button
                onClick={() => {
                  addToCart(service);
                  navigate("/booking-summary");
                }}
                className="w-full bg-fuchsia-900 dark:bg-fuchsia-1000 text-white px-4 py-2 rounded-md text-sm transition-transform duration-300 hover:scale-105 hover:bg-[#560d4a]"
              >
                Book Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default AvailableMenu;
