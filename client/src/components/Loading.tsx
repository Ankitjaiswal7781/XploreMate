import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#290f33] via-[#441055] to-[#9b47c6] flex items-center justify-center relative overflow-hidden">
      <Loader className="animate-spin w-16 h-16 text-white" />
    </div>
  );
};

export default Loading;
