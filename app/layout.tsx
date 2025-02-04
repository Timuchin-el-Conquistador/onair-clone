import type { Metadata } from "next";

import "@/styles/globals.scss";
import "@shoelace-style/shoelace/dist/themes/light.css";
import ShoelaceSetup from "./shoelace-setup";

export const metadata: Metadata = {
  title: "Test Mentor",
  description: "Test Mentor",
};

import { UserStoreProvider } from "@/providers/user";
import { SessionStoreProvider } from "@/providers/session";

import { retrieveSession } from "@/lib/session";

export default async function RootLayout(props: { children: React.ReactNode }) {
  const session = await retrieveSession();

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
        <script src="https://unpkg.com/peerjs@1.5.4/dist/peerjs.min.js"></script>
      </head>
      <body>
        {session != null ? (
          <UserStoreProvider>
            <SessionStoreProvider>
              <ShoelaceSetup>{props.children}</ShoelaceSetup>
            </SessionStoreProvider>
          </UserStoreProvider>
        ) : (
          <UserStoreProvider>
            <ShoelaceSetup>{props.children}</ShoelaceSetup>
          </UserStoreProvider>
        )}
      </body>
    </html>
  );
}
