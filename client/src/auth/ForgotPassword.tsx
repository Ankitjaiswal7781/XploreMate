import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/XploreMate.png";
import { useUserStore } from "@/store/useUserStore";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const { forgotPassword, loading } = useUserStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await forgotPassword(email);
    setSubmitted(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 md:p-8 w-full max-w-md rounded-lg mx-4 bg-white shadow-md border border-gray-200"
      >
        <div className="flex justify-center mb-0">
          <img src={Logo} alt="Logo" className="h-12" />
        </div>

        <div className="text-center">
          <h1 className="font-extrabold text-2xl mb-2">Forgot Password</h1>
          <p className="text-sm text-gray-600">
            Enter your email address to reset your password
          </p>
        </div>
        {!submitted ? (
          <>
            <div className="relative w-full">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="pl-10"
                required
              />
              <Mail className="absolute inset-y-2 left-2 text-gray-600 pointer-events-none" />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="bg-purple hover:bg-hoverPurple"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait!
                </>
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </>
        ) : (
          <div className="w-full py-3 px-4 bg-green-100 border border-green-300 text-green-800 text-sm rounded-lg">
            If an account exists for <b>{email}</b>, a password reset link has been sent.
          </div>
        )}

        <span className="text-center text-sm mt-4">
          Back to{" "}
          <Link to="/login" className="text-blue-500 font-medium hover:underline">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default ForgotPassword;

