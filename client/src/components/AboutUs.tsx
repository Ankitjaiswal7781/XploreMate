import { useEffect } from "react";
import { Link } from "react-router-dom";
import Ankit from "../assets/team1.jpg";
import Aditya from "../assets/team2.jpg";
import Dhruvansh from "../assets/team3.jpg";
import Ayush from "../assets/team4.jpg";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-4 sm:px-6 md:px-12 mt-20">
      {/* Mission & Vision */}
      <section className="max-w-5xl mx-auto py-12 text-center">
        <h2 className="text-3xl font-bold text-black dark:text-white">
          Our Mission & Vision
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mt-4">
          At <span className="font-semibold text-[#7d239b]">XploreMate</span>,
          we strive to make travel seamless and exciting by connecting travelers
          with local experts, ensuring authentic and immersive experiences.
        </p>
      </section>

      {/* Meet Our Team */}
      <section className="bg-gray-100 dark:bg-gray-800 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-black dark:text-white text-center">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            {[
              { name: "Ankit Kumar", role: "Full Stack Developer", img: Ankit },
              {
                name: "Aditya Dearwal",
                role: "Backend Developer",
                img: Aditya,
              },
              {
                name: "Dhruvansh Agrawal",
                role: "AI/ML Engineer",
                img: Dhruvansh,
              },
              { name: "Ayush Vadadoriya", role: "UI/UX Designer", img: Ayush },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 p-6 text-center rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-24 h-24 mx-auto rounded-full object-cover border-4 "
                />
                <h3 className="mt-4 text-xl font-semibold text-[#7d239b]">
                  {member.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-black dark:text-white text-center">
          Why Choose Us?
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {[
            {
              title: "Verified Guides",
              desc: "Connect with experienced and reliable local experts.",
            },
            {
              title: "Easy & Secure Booking",
              desc: "A hassle-free way to book your next adventure.",
            },
            {
              title: "Personalized Experiences",
              desc: "Tailor your journey to match your preferences.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 text-center bg-white dark:bg-gray-900 shadow-lg rounded-lg transition-transform duration-300 hover:scale-105 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white"
            >
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="mt-2">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Future Plans */}
      <section className="bg-gray-100 dark:bg-gray-800 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-black dark:text-white text-center">
            Our Future Goals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {[
              {
                title: "AI-Powered Recommendations",
                desc: "Suggesting the best experiences using AI.",
              },
              {
                title: "Augmented Reality Tours",
                desc: "Enhancing travel with AR-guided experiences.",
              },
              {
                title: "Global Expansion",
                desc: "Bringing XploreMate to more cities & countries.",
              },
              {
                title: "Community-Driven Content",
                desc: "Encouraging travelers to share experiences.",
              },
            ].map((goal, index) => (
              <div
                key={index}
                className="p-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg transition-transform duration-300 hover:scale-105 hover:bg-gray-200 dark:hover:bg-gray-900 hover:text-black dark:hover:text-white"
              >
                <h3 className="text-xl font-semibold">{goal.title}</h3>
                <p className="mt-2">{goal.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contribute & Join Us */}
      <section className="text-center py-12">
        <h2 className="text-3xl font-bold text-black dark:text-white">
          Want to Contribute?
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mt-4 max-w-xl mx-auto">
          We welcome passionate travelers and tech enthusiasts to collaborate
          with us! If you have ideas, suggestions, or want to join our team,
          we'd love to hear from you.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block bg-[#560d4a] text-white py-3 px-6 rounded-lg text-lg transition-transform duration-300 hover:scale-105"
        >
          Get Involved
        </Link>
      </section>
    </div>
  );
};

export default AboutUs;
