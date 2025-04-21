// import type { Metadata } from "next";
"use client";

import localFont from "next/font/local";
import Head from "next/head";

// import "./globals.css";
import { Provider } from "@/components/ui/provider";
import { UserProvider } from "@/context/UserContext";
import { AgentProvider } from "@/context/AgentContext";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// export const metadata: Metadata = {
//   title: "Odion AI",
//   description: "Create an AI Agent for your business",
// };

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
  const queryClient = new QueryClient();
  return (
    <html
      lang="en"
      className={`${neueMontreal.className}`}
      suppressHydrationWarning
    >
      <body>
        <Head>
          <title>Odion AI</title>
          <meta
            name="description"
            content="Create an AI Agent for your business"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <UserProvider>
          <AgentProvider>
            <QueryClientProvider client={queryClient}>
              <Provider>
                <Navbar />
                {children}
                <Toaster />
              </Provider>
            </QueryClientProvider>
          </AgentProvider>
        </UserProvider>
      </body>
    </html>
  );
}
