import Ankit from "../assets/team1.jpg";
import Aditya from "../assets/team2.jpg";
import Dhruvansh from "../assets/team3.jpg";
import Ayush from "../assets/team4.jpg";
import Suhani from "../assets/SuhaniReddy.webp";
import Shivam from "../assets/ShivamPandey.webp";

import Ahmedabad from "../assets/Ahmedabad.webp";
import Pune from "../assets/Pune.jpg";
import Mumbai from "../assets/Mumbai.jpg";
import Hyderabad from "../assets/Hyderabad.webp";
import Nainital from "../assets/Nainital.jpg";
import Patna from "../assets/Patna.jpg";

type BookingCardProps = {
  name: string;
  guide: string;
  location: string;
  price: string;
  reviewText: string;
  reviewerImage: string;
  reviewerName: string;
  rating: number;
  guideImage: string;
  placeImage: string;
};

const BookingCard = ({
  name,
  guide,
  location,
  price,
  reviewText,
  reviewerImage,
  reviewerName,
  rating,
  guideImage,
  placeImage,
}: BookingCardProps) => {
  return (
    <div className="relative bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="relative w-full h-48">
        <img
          src={placeImage}
          alt={location}
          className="w-full h-full object-cover opacity-75"
        />

        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-32 h-32 md:w-36 md:h-36 border-4 border-white dark:border-gray-800 rounded-full overflow-hidden shadow-xl">
            <img
              src={guideImage}
              alt={guide}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Top Right Price Strip */}
        <div className="absolute top-0 right-0 bg-purple text-white px-3 py-1 text-sm font-bold rounded-bl-lg">
          {price}
        </div>
      </div>

      {/* Review Section */}
      <div className="p-6 pt-16">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200 text-center">
          {name} booked a tour with {guide} in {location}
        </h3>

        {/* Traveler's Image & Review */}
        <div className="mt-4 flex items-center">
          <img
            src={reviewerImage}
            alt={reviewerName}
            className="w-10 h-10 rounded-full border-2 border-gray-300 mr-3"
          />
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {reviewText}
            </p>
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mt-1">
              {reviewerName}
            </p>
          </div>
        </div>

        {/* Rating */}
        <div className="mt-3 text-yellow-400 text-lg">{"★".repeat(rating)}</div>
      </div>
    </div>
  );
};

const RecentBookings = () => {
  const bookings = [
    {
      name: "Shreya Patel",
      guide: "Aditya Dearwal",
      location: "Ahmedabad, India",
      price: "Rs. 200/hr",
      reviewText:
        "Aditya made my stay in Ahmedabad truly enjoyable, safe and one for the books!",
      reviewerImage: "https://randomuser.me/api/portraits/men/1.jpg",
      reviewerName: "Shreya Patel",
      rating: 5,
      guideImage: Aditya,
      placeImage: Ahmedabad,
    },
    {
      name: "Aryan Rai",
      guide: "Ankit Kumar",
      location: "Pune, India",
      price: "Rs. 300/hr",
      reviewText:
        "Ankit is an excellent local expert and helped me explore Pune's culture!",
      reviewerImage: "https://randomuser.me/api/portraits/men/3.jpg",
      reviewerName: "Aryan Rai",
      rating: 5,
      guideImage: Ankit,
      placeImage: Pune,
    },
    {
      name: "Gaurav Singh",
      guide: "Dhruvansh Agrawal",
      location: "Mumbai, India",
      price: "Rs. 250/hr",
      reviewText:
        "Dhruvansh was a fabulous host and really made my Mumbai trip special!",
      reviewerImage: "https://randomuser.me/api/portraits/women/2.jpg",
      reviewerName: "Gaurav Singh",
      rating: 5,
      guideImage: Dhruvansh,
      placeImage: Mumbai,
    },
    {
      name: "Vivek Tiwari",
      guide: "Ayush Vadadoriya",
      location: "Hyderabad, India",
      price: "Rs. 230/hr",
      reviewText:
        "Ayush made my Hyderabad trip unforgettable! We explored hidden beaches & local food spots.",
      reviewerImage: "https://randomuser.me/api/portraits/women/18.jpg",
      reviewerName: "Vivek tiwari",
      rating: 5,
      guideImage: Ayush,
      placeImage: Hyderabad,
    },
    {
      name: "Ujjwal Yadav",
      guide: "Suhani Reddy",
      location: "Nainital, India",
      price: "Rs. 260/hr",
      reviewText:
        "Ruchi was a fantastic guide! She took me through all the sight seeings with such passion.",
      reviewerImage: "https://randomuser.me/api/portraits/men/20.jpg",
      reviewerName: "Ujjwal Yadav",
      rating: 5,
      guideImage: Suhani,
      placeImage: Nainital,
    },
    {
      name: "Rishav Raj",
      guide: "Shivam Pandey",
      location: "Patna, India",
      price: "Rs. 150/hr",
      reviewText:
        "Mukul knew everything about the street foods and Bihar history. Such an insightful tour!",
      reviewerImage: "https://randomuser.me/api/portraits/women/22.jpg",
      reviewerName: "Rishav Raj",
      rating: 5,
      guideImage: Shivam,
      placeImage: Patna,
    },
  ];

  return (
    <div className="w-full md:w-3/4 mx-auto py-10">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
        Recent Bookings of this week
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking, index) => (
          <BookingCard key={index} {...booking} />
        ))}
      </div>
      <button className="w-full sm:w-auto px-8 py-3 mt-6 mx-auto flex justify-center text-fuchsia-900 font-bold uppercase border-2 border-fuchsia-900 bg-white transition duration-300 hover:text-white hover:bg-hoverPurple">
        Show More
      </button>
    </div>
  );
};

export default RecentBookings;
