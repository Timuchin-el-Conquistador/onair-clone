"use client";

import "@/styles/spinner/pulse.scss";

function CardPulse() {
  return (
    <div className="index-card item-overflow-visible relative skeleton-wrapper">
      <div className="skeleton-image"></div>
      <div className="skeleton-text"></div>
      <div className="skeleton-text"></div>
      <div className="skeleton-text short"></div>
    </div>
  );
}

export default CardPulse;
