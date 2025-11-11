import { Card, CardContent } from "./ui/card";
import CityExplorationTours from "../assets/City Exploration Tours.jpg";
import FoodCulinaryTours from "../assets/Food & Culinary Tours.jpg";
import AdventureOutdoorActivities from "../assets/Adventure & Outdoor Activities.webp";
import CulturalHeritageTours from "../assets/Cultural & Heritage Tours.jpg";
import ShoppingHandicraftAssistance from "../assets/Shopping & Handicraft Assistance.jpg";
import NightlifeEntertainment from "../assets/Nightlife & Entertainment.webp";
import CustomizedPrivateTours from "../assets/Customized Private Tours.jpg";
import PhotographyTravelBloggingTours from "../assets/Photography & Travel Blogging Tours.avif";
import SpiritualWellnessRetreats from "../assets/Spiritual & Wellness Retreats.webp";
import WildlifeNatureTours from "../assets/Wildlife & Nature Tours.jpg";
import TransportationTravelAssistance from "../assets/Transportation & Travel Assistance.jpg";
import FestivalSpecialEventTours from "../assets/Festival & Special Event Tours.jpg";
import LocalLanguageCultureClasses from "../assets/Local Language & Culture Classes.jpg";
import WorkationDigitalNomadServices from "../assets/Workation & Digital Nomad Services.jpg";
import HiddenGemsOffbeatTours from "../assets/Hidden Gems & Offbeat Tours.jpg";
import { useEffect } from "react";

const services = [
  {
    name: "City Exploration Tours",
    image: CityExplorationTours,
    description:
      "Guided walking or vehicle tours covering famous landmarks, markets, and key attractions. Local stories and historical insights shared by expert guides. Options for half-day or full-day city tours with multiple stops.",
  },
  {
    name: "Food & Culinary Tours",
    image: FoodCulinaryTours,
    description:
      "Explore local street food hubs and authentic traditional restaurants. Learn about the history and ingredients of famous dishes. Cooking classes with local chefs for a hands-on experience.",
  },
  {
    name: "Adventure & Outdoor Activities",
    image: AdventureOutdoorActivities,
    description:
      "Trekking and hiking in scenic mountains, hills, and nature trails. Water sports like river rafting, kayaking, and scuba diving. Camping, paragliding, and zip-lining for thrill-seekers.",
  },
  {
    name: "Cultural & Heritage Tours",
    image: CulturalHeritageTours,
    description:
      "Guided visits to historical sites, forts, palaces, and museums. Traditional art and craft workshops with local artisans. Insights into the culture, customs, and historical significance of places.",
  },
  {
    name: "Shopping & Handicraft Assistance",
    image: ShoppingHandicraftAssistance,
    description:
      "Help in finding authentic souvenirs, handmade crafts, and local art. Guided tours of flea markets, traditional bazaars, and boutique stores. Assistance in bargaining and getting the best deals.",
  },
  {
    name: "Nightlife & Entertainment",
    image: NightlifeEntertainment,
    description:
      "Pub crawls to experience the best bars and clubs in the city. Live music, theatre, and cultural performances with a local guide. Visits to night markets, rooftop lounges, and party hotspots.",
  },
  {
    name: "Customized Private Tours",
    image: CustomizedPrivateTours,
    description:
      "Personalized itineraries based on traveler preferences and interests. Private car and guide for an exclusive experience. Flexibility to choose destinations, activities, and duration.",
  },
  {
    name: "Photography & Travel Blogging Tours",
    image: PhotographyTravelBloggingTours,
    description:
      "Guided photography sessions at scenic and Instagram-worthy locations. Assistance with drone photography and professional shoots. Insider tips for travel bloggers on content creation.",
  },
  {
    name: "Spiritual & Wellness Retreats",
    image: SpiritualWellnessRetreats,
    description:
      "Meditation and yoga sessions in serene locations. Visits to temples, monasteries, and spiritual centers. Participation in traditional wellness practices like Ayurveda.",
  },
  {
    name: "Wildlife & Nature Tours",
    image: WildlifeNatureTours,
    description:
      "Guided safaris in national parks and wildlife reserves. Birdwatching and eco-tourism experiences in natural habitats. Nature walks and jungle trekking with wildlife experts.",
  },
  {
    name: "Transportation & Travel Assistance",
    image: TransportationTravelAssistance,
    description:
      "Help with booking and navigating public transport (buses, metros, trains). Private car rentals and chauffeur services. Airport pick-up, drop-off, and intercity travel assistance.",
  },
  {
    name: "Festival & Special Event Tours",
    image: FestivalSpecialEventTours,
    description:
      "Guided experiences of major cultural and traditional festivals. Participation in Holi, Diwali, Oktoberfest, and other celebrations. VIP access or behind-the-scenes experiences for local events.",
  },
  {
    name: "Local Language & Culture Classes",
    image: LocalLanguageCultureClasses,
    description:
      "Quick crash courses in the local language for easy communication. Insights into cultural etiquette and local traditions. Interaction with native speakers for real-world practice.",
  },
  {
    name: "Workation & Digital Nomad Services",
    image: WorkationDigitalNomadServices,
    description:
      "Recommendations for co-working spaces with fast WiFi. Connecting with local networking events and digital nomad communities. Assistance with long-term accommodation and workspace setup.",
  },
  {
    name: "Hidden Gems & Offbeat Tours",
    image: HiddenGemsOffbeatTours,
    description:
      "Exploration of lesser-known villages, secret beaches, and remote locations. Adventure into caves, waterfalls, and untouched nature spots. Immersive local experiences away from tourist crowds.",
  },
];

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="p-10 md:px-16 lg:px-24 mt-20">
      <h1 className="text-xl md:text-2xl font-extrabold mb-6 text-gray-900 dark:text-white text-center">
        Our wide variety of services that we provide
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <Card
            key={index}
            className="relative bg-white dark:bg-[#121212] border border-gray-300 dark:border-gray-700 shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 group"
          >
            <div className="overflow-hidden">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-40 object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            <CardContent className="p-4">
              <h2 className="text-base md:text-lg font-bold text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-[#560d4a]">
                {service.name}
              </h2>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-2">
                {service.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Services;
