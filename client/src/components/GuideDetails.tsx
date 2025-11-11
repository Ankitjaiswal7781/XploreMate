import { Timer } from "lucide-react";
import { Badge } from "./ui/badge";
import AvailableServices from "./AvailableServices";
import { useGuideStore } from "@/store/useGuideStore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const GuideDetails = () => {
  const params = useParams();
  const { singleGuide, getSingleGuide } = useGuideStore();

  useEffect(() => {
    getSingleGuide(params.id!);
  }, [params.id]);

  return (
    <div className="max-w-6xl mx-auto my-10 mt-20">
      <div className="w-full">
        <div className="relative w-full h-32 md:h-64 lg:h-72 overflow-hidden rounded-lg group">
          <img
            src={singleGuide?.imageUrl || "Loading..."}
            alt="guide_image"
            className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105 group-hover:shadow-2xl"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="my-5">
            <h1 className="font-bold text-2xl">
              {singleGuide?.guideName || "Loading..."}
            </h1>
            <div className="flex gap-2 my-2">
              {singleGuide?.servicesTypes.map(
                (services: string, idx: number) => (
                  <Badge key={idx}>{services}</Badge>
                )
              )}
            </div>
            <div className="flex md:flex-row flex-col gap-2 my-5">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5" />
                <h1 className="flex items-center gap-2 font-bold">
                  Approx Tour Duration:{" "}
                  <span className="text-[#7d239b]">
                    {singleGuide?.tourDuration || "NA"} Hours Tour
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
        {singleGuide?.services && (
          <AvailableServices services={singleGuide?.services} />
        )}
      </div>
    </div>
  );
};
export default GuideDetails;
