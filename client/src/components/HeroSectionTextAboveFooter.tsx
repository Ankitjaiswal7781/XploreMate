const HeroSectionTextAboveFooter = () => {
  return (
    <div
      className="relative bg-cover bg-center text-white py-16 px-6"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1575986767340-5d17ae767ab0?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          XploreMate: Your Ultimate Local Travel Companion
        </h2>
        <p className="text-lg md:text-l mb-6">
          The best way to truly experience a destination is through the eyes of
          a local who shares your interests. Whether you’re passionate about
          history, adventure, food, culture, or nightlife, XploreMate helps you
          customize your journey with expert local guides who know the city
          inside out.
        </p>
        <p className="text-lg md:text-l mb-6">
          XploreMate is an innovative platform that connects travelers with
          verified local guides who offer personalized experiences. It’s more
          than just a travel service, it's a community-driven marketplace where
          you can explore destinations at your own pace, with a local expert
          tailoring the experience just for you.
        </p>
        <p className="text-lg md:text-l mb-6">
          From iconic cities like Delhi, Mumbai, and Paris to lesser-known gems
          like Jaisalmer, Hampi, or Tbilisi, XploreMate is your gateway to
          authentic and unforgettable adventures.
        </p>
        <a
          href="/"
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg text-lg transition duration-300 inline-block"
        >
          Your journey begins with a local, start exploring with XploreMate
          today!
        </a>
      </div>
    </div>
  );
};

export default HeroSectionTextAboveFooter;
