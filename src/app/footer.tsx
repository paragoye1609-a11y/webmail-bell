"use client";
import {
  ChevronRight,
  FileText,
  Shield,
  UserCog,
  HeartPulse,
  PlayCircle,
  Landmark,
} from "lucide-react";

export default function Footer() {
  const footerLinks = [
    { text: "Web Terms Of Service", href: "#", icon: FileText },
    { text: "CA Notice at Collection", href: "#", icon: Landmark },
    { text: "Privacy Policy", href: "#", icon: Shield },
    { text: "Your Privacy Choices", href: "#", icon: UserCog },
    { text: "Health Privacy Notice", href: "#", icon: HeartPulse },
    { text: "Ad Choices", href: "#", icon: PlayCircle },
  ];

  // Xfinity specific colors (some might be overridden by inline styles from user)

  return (
    <footer className="w-full py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="text-sm mb-6 text-[#666]">© 2025 Comcast</div>

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 sm:gap-x-6">
          {footerLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-sm flex items-center gap-1 hover:underline text-[#141417]"
            >
              {link.icon && <link.icon className="w-3.5 h-3.5" />}
              <span>{link.text}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
