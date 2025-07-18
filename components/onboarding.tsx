"use client";

import { useState } from "react";
import "@/styles/onboarding.scss";

function ShopifyOnboarding({
  themes = [],
  store,
}: {
  themes: { id: string; name: string }[];
  store: string;
}) {
  const [selectedThemeId, setSelectedThemeId] = useState("");

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedThemeId(e.target.value);
  };

  return (
    <div className="cont mx-6 mt-6">
      <h2 className="header">🛠️ Shopify App Setup</h2>

      <div className="instructions">
        <h4>📋 Instructions to test the app in your store</h4>
        <ol>
          <li>
            Visit the{" "}
            <a
              href={`https://admin.shopify.com/store/${store}/themes`}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              link
            </a>{" "}
            to open your Shopify Theme Editor.
          </li>
          <li>
            Find the <strong>Dawn</strong> theme and click the{" "}
            <strong>Customize</strong> button.
          </li>
          <li>
            In the left sidebar, scroll to the <strong>App Embeds</strong>{" "}
            section.
          </li>
          <li>Find our app and click the checkbox to enable it.</li>
          <li>
            Once enabled, our app will appear on the <strong>right side</strong>{" "}
            of your store pages.
          </li>
          <li>
            It will be visible on <strong>all pages</strong> of your store.
          </li>
        </ol>
      </div>
    </div>
  );
}

export default ShopifyOnboarding;
