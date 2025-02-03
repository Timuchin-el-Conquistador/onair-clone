"use client";

import Image from "next/image";

function CallDeclined() {
  return (
    <div className="max-w-lg mx-auto mt-48 text-center px-8 sm:px-0">
      <div className="text-center">
        <Image
          className="w-16 inline-block"
          src="/logo-white.svg"
          alt="logo"
          width={0}
          height={0}
        />
      </div>

      <div data-cy="big-message-title" className="mt-6 text-xl font-bold">
        Call Ended
      </div>

      <div className="mt-6 text-base text-center leading-6">
        The call link is no longer active.
      </div>
    </div>
  );
}

export default CallDeclined;
