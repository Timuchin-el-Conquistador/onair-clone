import Image from "next/image";
import Link from "next/link";

import "@/styles/List/list-item.scss";

import { useState } from "react";

import DefaultImage from '@/public/default-test-image.png'

// Example prop type
interface Props {
  imgUrl: string | null;
  itemName: string;
  itemId: string;
}

function Test({
  imgUrl,
  itemName,
  itemId,
}: Props) {

  const [imgUrlState, setImgUrlState] = useState(imgUrl || DefaultImage);

  return (
    <li className="flex items-center px-5 li">
      <Image
        src={imgUrlState}
        alt={itemName}
        width={120}
        height={200}
        priority={true}
        onError={() =>{
          setImgUrlState(DefaultImage)
        }}
      />
      <div className="h-full flex relative">
      <div className="h-full flex items-start ml-5 py-3">
        <p>{itemName}</p>
      </div>
      <div className="h-full flex justify-between items-end ml-5 py-3 absolute right-0">
        <Link href={`/home/${itemId}`} className="flex">
          Start{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M5.93998 13.78C5.81332 13.78 5.68665 13.7333 5.58665 13.6333C5.39332 13.44 5.39332 13.12 5.58665 12.9267L9.93332 8.58C10.2533 8.26 10.2533 7.74 9.93332 7.42L5.58665 3.07333C5.39332 2.88 5.39332 2.56 5.58665 2.36666C5.77998 2.17333 6.09998 2.17333 6.29332 2.36666L10.64 6.71333C10.98 7.05333 11.1733 7.51333 11.1733 8C11.1733 8.48666 10.9866 8.94666 10.64 9.28666L6.29332 13.6333C6.19332 13.7267 6.06665 13.78 5.93998 13.78Z"
              fill="#7356C0"
            />
          </svg>
        </Link>
      </div>
      </div>
    </li>
  );
}

export default Test;
