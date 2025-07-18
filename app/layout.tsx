import type { Metadata } from "next";

import "@/styles/globals.scss";
import "@shoelace-style/shoelace/dist/themes/light.css";
import ShoelaceSetup from "./shoelace-setup";

export const metadata: Metadata = {
  title: "Shoporia: One Click, Instant Sales",
  description: "With Shoporia, every customer interaction is a chance to boost satisfaction, loyalty, and revenue. Get started today and elevate your e-commerce sales!s",
};

import { UserStoreProvider } from "@/providers/user";
import { SessionStoreProvider } from "@/providers/session";

import { retrieveSession } from "@/lib/session";
import { Session } from "@/lib/types/user";

import SocketConnectionLayout from "@/components/layouts/socket";

export default async function RootLayout(props: { children: React.ReactNode }) {
  const session = (await retrieveSession()) as Session;
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
        <UserStoreProvider>
          <SessionStoreProvider>
            <ShoelaceSetup>
              <SocketConnectionLayout
                isAuth={session != null}
                userId={session?.userId || null}
              >
                {props.children}
              </SocketConnectionLayout>
            </ShoelaceSetup>
          </SessionStoreProvider>
        </UserStoreProvider>
      </body>
    </html>
  );
}
