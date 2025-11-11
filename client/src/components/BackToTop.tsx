const BackToTop = () => {
  return (
    <div
      className="w-full h-[50px] bg-gray-800 flex items-center justify-center text-white text-sm cursor-pointer"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <h3 className="font-bold text-sm text-center">Back to Top</h3>
    </div>
  );
};

export default BackToTop;
