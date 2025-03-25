import type { Metadata } from "next";
import localFont from "next/font/local";

// import "./globals.css";
import { Provider } from "@/components/ui/provider";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Odion AI",
  description: "Create an AI Agent for your business",
};

const neueMontreal = localFont({
  src: [
    {
      path: "../public/fonts/neue-montreal/NeueMontreal-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/neue-montreal/NeueMontreal-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/neue-montreal/NeueMontreal-Medium.otf",
      weight: "400",
      style: "normal",
    },
  ],
  // Optional: Define a CSS variable for the font
  variable: "--font-neue-montreal",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${neueMontreal.className}`}
      suppressHydrationWarning
    >
      <body>
        <Provider>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
