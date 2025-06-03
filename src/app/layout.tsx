import type { Metadata } from "next";
import "./globals.css";

import localFont from "next/font/local";

const DM_Sans = localFont({
  src: "./../fonts/DM_Sans/static/DMSans_36pt-Medium.ttf",
  display: "swap",
  variable: "--font-dm-sans",
});

const XfinityBrown = localFont({
  src: "./../fonts/xfinity-brown/XfinityBrown-Bold.woff2",
  display: "swap",
  variable: "--font-xfinity-brown",
});

export const metadata: Metadata = {
  title: "Sign in to Xfinity",
  description:
    "Get the most out of Xfinity from Comcast by signing in to your account. Enjoy and manage TV, high-speed Internet, phone, and home security services that work seamlessly together — anytime, anywhere, on any device.",
  icons: {
    icon: "/images/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${DM_Sans.variable} ${XfinityBrown.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
