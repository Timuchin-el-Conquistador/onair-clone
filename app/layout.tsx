import type { Metadata } from "next";

import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: "Test Mentor",
  description: "Test Mentor",
};

import { LayoutStoreProvider } from "@/providers/layout";

import { UserStoreProvider } from "@/providers/user";

import '@shoelace-style/shoelace/dist/themes/light.css';

import ShoelaceSetup from "./shoelace-setup";



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <head>
        {/* Link to Google Fonts Montserrat */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Arimo:ital,wght@0,400..700;1,400..700&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />

  
      </head>
      <body>
        <LayoutStoreProvider>
          <UserStoreProvider><ShoelaceSetup>{children}</ShoelaceSetup></UserStoreProvider>
        </LayoutStoreProvider>
      </body>
    </html>
  );
}
