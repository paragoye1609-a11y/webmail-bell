import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bell email",
  description: "Bell email",
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
      <body className={` antialiased`}>{children}</body>
    </html>
  );
}
