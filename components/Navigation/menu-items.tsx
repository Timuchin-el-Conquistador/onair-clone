import "@/styles/Navigation/nav-item.scss";
import Link from "next/link";

function Home({ active }: { active: boolean }) {
  return (
    <Link className="nav-item flex flex-col items-center" href="/home">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
      >
        <path
          d="M9.32005 2.84001L3.93005 7.04001C3.03005 7.74001 2.30005 9.23001 2.30005 10.36V17.77C2.30005 20.09 4.19005 21.99 6.51005 21.99H18.09C20.41 21.99 22.3 20.09 22.3 17.78V10.5C22.3 9.29001 21.49 7.74001 20.5 7.05001L14.32 2.72001C12.92 1.74001 10.67 1.79001 9.32005 2.84001Z"
          stroke={active ? "#7F56D9" : "#98A2B3"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.3 17.99V14.99"
          stroke={active ? "#7F56D9" : "#98A2B3"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {active ? <p>Home</p> : null}
    </Link>
  );
}

function Plans({ active }: { active: boolean }) {
  return (
    <Link className="nav-item flex flex-col items-center" href="/plans">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
      >
        <path
          d="M13.1001 9H7.1001"
          stroke={active ? "#7F56D9" : "#98A2B3"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22.1001 10.97V13.03C22.1001 13.58 21.6601 14.03 21.1001 14.05H19.14C18.06 14.05 17.0701 13.26 16.9801 12.18C16.9201 11.55 17.16 10.96 17.58 10.55C17.95 10.17 18.46 9.95001 19.02 9.95001H21.1001C21.6601 9.97001 22.1001 10.42 22.1001 10.97Z"
          stroke={active ? "#7F56D9" : "#98A2B3"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.5801 10.55C17.1601 10.96 16.9201 11.55 16.9801 12.18C17.0701 13.26 18.0601 14.05 19.1401 14.05H21.1001V15.5C21.1001 18.5 19.1001 20.5 16.1001 20.5H7.1001C4.1001 20.5 2.1001 18.5 2.1001 15.5V8.5C2.1001 5.78 3.7401 3.88 6.2901 3.56C6.5501 3.52 6.8201 3.5 7.1001 3.5H16.1001C16.3601 3.5 16.6101 3.50999 16.8501 3.54999C19.4301 3.84999 21.1001 5.76 21.1001 8.5V9.95001H19.0201C18.4601 9.95001 17.9501 10.17 17.5801 10.55Z"
          stroke={active ? "#7F56D9" : "#98A2B3"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {active ? <p>Plans</p> : null}
    </Link>
  );
}

function Profile({ active }: { active: boolean }) {
  return (
    <Link className="nav-item flex flex-col items-center" href="/profile">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
      >
        <path
          d="M12.8199 12.78C12.7499 12.77 12.6599 12.77 12.5799 12.78C10.8199 12.72 9.41992 11.28 9.41992 9.51001C9.41992 7.70001 10.8799 6.23001 12.6999 6.23001C14.5099 6.23001 15.9799 7.70001 15.9799 9.51001C15.9699 11.28 14.5799 12.72 12.8199 12.78Z"
          stroke={active ? "#7F56D9" : "#98A2B3"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.44 19.38C17.66 21.01 15.3 22 12.7 22C10.1 22 7.73996 21.01 5.95996 19.38C6.05996 18.44 6.65996 17.52 7.72996 16.8C10.47 14.98 14.95 14.98 17.67 16.8C18.74 17.52 19.34 18.44 19.44 19.38Z"
          stroke={active ? "#7F56D9" : "#98A2B3"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.7 22C18.2228 22 22.7 17.5228 22.7 12C22.7 6.47715 18.2228 2 12.7 2C7.1771 2 2.69995 6.47715 2.69995 12C2.69995 17.5228 7.1771 22 12.7 22Z"
          stroke={active ? "#7F56D9" : "#98A2B3"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {active ? <p>Profile</p> : null}
    </Link>
  );
}

export { Home,Plans, Profile };
