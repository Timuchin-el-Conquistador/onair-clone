import type { Metadata } from "next";

import "@/styles/globals.scss";
import "@shoelace-style/shoelace/dist/themes/light.css";

export const metadata: Metadata = {
  title: "Test Mentor",
  description: "Test Mentor",
};

import { UserStoreProvider } from "@/providers/user";
import { SessionStoreProvider } from "@/providers/session";

import P2PLayout from "@/components/layouts/P@P";
import PublicLayout from "@/components/layouts/public";

import ShoelaceSetup from "./shoelace-setup";

import { verifySession } from "@/lib/dal";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = await verifySession();
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
              <P2PLayout userId={session.userId as string}>
                <ShoelaceSetup>{children}</ShoelaceSetup>
              </P2PLayout>
            </SessionStoreProvider>
          </UserStoreProvider>
        ) : (
          <UserStoreProvider>
            <PublicLayout>
            <ShoelaceSetup>{children}</ShoelaceSetup>
            </PublicLayout>
          </UserStoreProvider>
        )}
      </body>
    </html>
  );
}
