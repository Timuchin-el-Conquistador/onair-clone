import Link from "next/link";

import '@/styles/layouts.scss'

function Layout({
  link,
  page,
  children,
  btnClick
}: {
  link: string | null;
  page: string;
  children: React.ReactNode;
  btnClick?:() => void | null
}) {
  return (
    <div className="layout1">
      <div className="w-screen fixed flex items-center layout1__head">
        {link != null &&<Link href={link} onClick={btnClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M14.9998 19.92L8.47984 13.4C7.70984 12.63 7.70984 11.37 8.47984 10.6L14.9998 4.08002"
              stroke="white"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>}

        <span>{page}</span>
      </div>
      <div className="layout1__body flex flex-col justify-around items-center">{children}</div>
    </div>
  );
}

export default Layout;
