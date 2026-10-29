import { Raleway } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
});

export const metadata = {
  title: "Portafolio",
  description:
    "Full Stack Developer Portfolio for Miguel Angel Giraldo Duque- Specialized in React, Node.js, JavaScript and modern web technologies. Explore my projects, skills and professional experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={raleway.variable}>
      <body>{children}</body>
    </html>
  );
}
