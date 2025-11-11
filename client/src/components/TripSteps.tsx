import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import TripStepsImage from "../assets/TripSteps.avif";

const TripSteps = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto p-10 rounded-lg shadow-lg text-center overflow-hidden my-10 transition-transform duration-300 ease-in-out hover:scale-110">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${TripStepsImage})` }}
      ></div>

      <div className="absolute inset-0 bg-white bg-opacity-40 dark:bg-gray-900 dark:bg-opacity-50"></div>

      <div className="relative z-10">
        <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white">
          BOOK A LOCAL GUIDE & EXPLORE YOUR DESTINATION
        </h2>

        <div className="relative flex flex-col md:flex-row items-center gap-6 mt-6">
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 flex items-center justify-center rounded-full bg-green-500 text-white text-lg font-bold">
              1
            </span>
            <p className="text-gray-700 dark:text-gray-300 text-lg font-bold">
              Explore Local Guides
            </p>
          </div>

          <ChevronRight className="w-6 h-6 text-gray-500 dark:text-gray-300 hidden md:block" />

          <div className="flex items-center gap-3">
            <span className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-500 text-white text-lg font-bold">
              2
            </span>
            <p className="text-gray-700 dark:text-gray-300 text-lg font-bold">
              Choose a Preferred Service
            </p>
          </div>

          <ChevronRight className="w-6 h-6 text-gray-500 dark:text-gray-300 hidden md:block" />

          <div className="flex items-center gap-3">
            <span className="w-12 h-12 flex items-center justify-center rounded-full bg-red-500 text-white text-lg font-bold">
              3
            </span>
            <p className="text-gray-700 dark:text-gray-300 text-lg font-bold">
              Book your Guide
            </p>
          </div>
        </div>

        <Button className="mt-6 px-6 py-3 text-lg rounded-md text-white bg-purple hover:bg-hoverPurple">
          BOOK GUIDE
        </Button>
      </div>
    </div>
  );
};

export default TripSteps;
