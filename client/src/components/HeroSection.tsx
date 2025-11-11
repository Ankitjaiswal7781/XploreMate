import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import HeroImage from "../assets/HeroImage.png";
import { useNavigate } from "react-router-dom";
import GuideList from "./GuideList";
import HeroSectionTextAboveFooter from "./HeroSectionTextAboveFooter";
import HomeBanner from "./HomeBanner";
import TripSteps from "./TripSteps";
import BackToTop from "./BackToTop";
import RecentBookings from "./RecentBookings";

const HeroSection = () => {
  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="mt-20">
        <HomeBanner />
      </div>
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto md:p-10 rounded-lg items-center justify-center m-4 gap-20">
        <div className="flex flex-col gap-10 md:w-[40%]">
          <div className="flex flex-col gap-5">
            <h1 className="font-bold md:font-extrabold md:text-5xl text-4xl">
              Discover Cities Through a Local’s Eyes!
            </h1>
            <p className="text-gray-500">
              Book trusted local guides and explore hidden gems, culture, and
              experiences like never before.
            </p>
          </div>
          <div className="relative flex items-center gap-2">
            <Input
              type="text"
              value={searchText}
              placeholder="Search guide by name, city & country"
              onChange={(e) => setSearchText(e.target.value)}
              className="pl-10 shadow-lg"
            />
            <Search className="text-gray-500 absolute inset-y-2 left-2" />
            <Button
              onClick={() => navigate(`/search/${searchText}`)}
              className="bg-purple hover:bg-hoverPurple"
            >
              Search
            </Button>
          </div>
        </div>
        <div>
          <img
            src={HeroImage}
            alt="heroImage"
            className="object-cover w-full max-h-[500px]"
          />
        </div>
      </div>
      <GuideList />
      <TripSteps />
      <RecentBookings />
      <HeroSectionTextAboveFooter />
      <BackToTop />
    </>
  );
};
export default HeroSection;
