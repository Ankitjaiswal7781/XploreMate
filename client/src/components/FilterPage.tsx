import { useGuideStore } from "@/store/useGuideStore";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

export type FilterOptionsState = {
  id: string;
  label: string;
}[];

const filterOptions: FilterOptionsState = [
  { id: "cityExplorationTours", label: "City Exploration Tours" },
  { id: "wildlifeNatureTours", label: "Wildlife & Nature Tours" },
  { id: "culturalHeritageTours", label: "Cultural & Heritage Tours" },
  { id: "hiddenGemsOffbeatTours", label: "Hidden Gems & Offbeat Tours" },
  { id: "foodCulinaryTours", label: "Food & Culinary Tours" },
  { id: "adventureOutdoorActivities", label: "Adventure & Outdoor Activities" },
  {
    id: "shoppingHandicraftAssistance",
    label: "Shopping & Handicraft Assistance",
  },
  { id: "nightlifeEntertainment", label: "Nightlife & Entertainment" },
  { id: "customizedPrivateTours", label: "Customized Private Tours" },
  {
    id: "photographyTravelBloggingTours",
    label: "Photography & Travel Blogging Tours",
  },
  { id: "spiritualWellnessRetreats", label: "Spiritual & Wellness Retreats" },
  {
    id: "transportationTravelAssistance",
    label: "Transportation & Travel Assistance",
  },
  { id: "festivalSpecialEventTours", label: "Festival & Special Event Tours" },
  {
    id: "localLanguageCultureClasses",
    label: "Local Language & Culture Classes",
  },
  {
    id: "workationDigitalNomadServices",
    label: "Workation & Digital Nomad Services",
  },
];

const FilterPage = () => {
  const { setAppliedFilter, appliedFilter, resetAppliedFilter } =
    useGuideStore();
  const appliedFilterHandler = (value: string) => {
    setAppliedFilter(value);
  };

  return (
    <div className="md:w-72">
      <div className="flex items-center justify-between">
        <h1 className="font-medium texl-lg">Filter by services</h1>
        <Button variant={"link"} onClick={resetAppliedFilter}>
          Reset
        </Button>
      </div>
      {filterOptions.map((option) => (
        <div key={option.id} className="flex items-center space-x-2 my-5">
          <Checkbox
            id={option.id}
            checked={appliedFilter.includes(option.label)}
            onClick={() => appliedFilterHandler(option.label)}
          />
          <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {option.label}
          </Label>
        </div>
      ))}
    </div>
  );
};
export default FilterPage;
