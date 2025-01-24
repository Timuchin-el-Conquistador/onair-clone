"use client";

import { useEffect } from "react";
type PageProps = {
  deleteSessionAction: () => void;
};
export default async function SignOut(props: PageProps) {
  // Trigger the session deletion when the page is rendered

  // Return a response to redirect the user to the sign-in page

  useEffect(() => {
    props.deleteSessionAction(); // Call the async function
  }, [props.deleteSessionAction]);
  return (
    <div>
      <p>Logging out...</p>
      {/* You can display a loading or waiting message here if needed */}
    </div>
  );
}
