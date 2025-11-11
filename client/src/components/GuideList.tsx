import Preeti from "../assets/PreetiSharma.jpg";
import Rahul from "../assets/RahulVerma.webp";
import Aditya from "../assets/AdityaDearwal.webp";
import Priya from "../assets/PriyaSingh.jpg";
import Suhani from "../assets/SuhaniReddy.webp";
import Shivam from "../assets/ShivamPandey.webp";

type Guide = {
  name: string;
  location: string;
  price: string;
  reviews: number;
  rating: number;
  description: string;
  image: string;
};

const guides: Guide[] = [
  {
    name: "Preeti Sharma",
    location: "Agra, India",
    price: "Rs. 250/hr",
    reviews: 120,
    rating: 4.8,
    description: "Explore the rich Mughal heritage and the iconic Taj Mahal.",
    image: Preeti,
  },
  {
    name: "Rahul Verma",
    location: "Jaipur, India",
    price: "Rs. 200/hr",
    reviews: 98,
    rating: 4.7,
    description:
      "Discover the royal palaces, vibrant bazaars, and hidden gems.",
    image: Rahul,
  },
  {
    name: "Aditya Dearwal",
    location: "Shimla, India",
    price: "Rs. 400/hr",
    reviews: 83,
    rating: 4.9,
    description: "Experience colonial charm and breathtaking Himalayan views.",
    image: Aditya,
  },
  {
    name: "Priya Singh",
    location: "Pune, India",
    price: "Rs. 230/hr",
    reviews: 26,
    rating: 4.4,
    description: "Uncover a blend of history, culture, and modern vibes.",
    image: Priya,
  },
  {
    name: "Suhani Reddy",
    location: "Chennai, India",
    price: "Rs. 170/hr",
    reviews: 45,
    rating: 4.3,
    description:
      "Enjoy stunning beaches, ancient temples, and rich traditions.",
    image: Suhani,
  },
  {
    name: "Shivam Pandey",
    location: "Daman, India",
    price: "Rs. 400/hr",
    reviews: 122,
    rating: 4.9,
    description: "Relax by serene beaches with Portuguese colonial influences.",
    image: Shivam,
  },
];

const GuideList = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Find your local tour guides with XploreMate
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full md:w-3/4 mx-auto">
        {guides.map((guide, index) => (
          <div
            key={index}
            className="w-full group flex flex-col md:flex-row bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          >
            {/* Left Side - Image */}
            <div className="w-full md:w-1/3 overflow-hidden">
              <img
                src={guide.image}
                alt={guide.name}
                className="w-full h-56 md:h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            {/* Right Side - Details */}
            <div className="p-6 flex flex-col justify-center md:w-2/3">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold transition-colors duration-300 group-hover:text-[#560d4a] dark:group-hover:text-[#a02b8f] dark:text-white">
                  {guide.name}
                </h3>
                <p className="text-purple-600 dark:text-purple-400 font-semibold text-lg">
                  {guide.price}
                </p>
              </div>

              <p className="text-gray-600 dark:text-gray-300">
                {guide.location}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {guide.description}
              </p>

              <div className="flex justify-between items-center mt-2">
                <p className="text-gray-600 dark:text-gray-300">
                  ⭐ {guide.rating} ({guide.reviews} reviews)
                </p>
                <button className="bg-purple-600 dark:bg-purple-500 text-white px-4 py-2 rounded-md text-sm transition-transform duration-300 hover:scale-105">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuideList;
