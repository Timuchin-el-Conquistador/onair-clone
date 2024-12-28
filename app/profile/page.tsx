'use client'

import Navigation from "@/components/Navigation";

import Link from "next/link";

import "@/styles/profile.scss";

import Avatar from "@/components/avatar";

import { useUserStore } from "@/providers/user";

import { useRouter } from "next/navigation";

import { useEffect } from "react";



function Profile() {
  const router = useRouter()
  const {logout,user,getUser} = useUserStore(state => state)


  useEffect(() => {
    if(user != null) return
    getUser()
  
  },[])


  return (
    <main className="profile">
      <div className="w-screen fixed  profile__header">
        
        <Avatar/>
      </div>
      <div className="profile__body">
        <ul>
          <li>
            <Link href="/edit" className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <circle cx="20" cy="20" r="20" fill="#EADDFC" />

                <g transform="translate(8, 8)">
                  <path
                    opacity="0.4"
                    d="M12 2C9.38 2 7.25 4.13 7.25 6.75C7.25 9.32 9.26 11.4 11.88 11.49C11.96 11.48 12.04 11.48 12.1 11.49C12.12 11.49 12.13 11.49 12.15 11.49C12.16 11.49 12.16 11.49 12.17 11.49C14.73 11.4 16.74 9.32 16.75 6.75C16.75 4.13 14.62 2 12 2Z"
                    fill="#7356C0"
                  />
                  <path
                    d="M17.08 14.15C14.29 12.29 9.73996 12.29 6.92996 14.15C5.65996 15 4.95996 16.15 4.95996 17.38C4.95996 18.61 5.65996 19.75 6.91996 20.59C8.31996 21.53 10.16 22 12 22C13.84 22 15.68 21.53 17.08 20.59C18.34 19.74 19.04 18.6 19.04 17.36C19.03 16.13 18.34 14.99 17.08 14.15Z"
                    fill="#7356C0"
                  />
                </g>
              </svg>

              <div>
                <span>Profile</span>
                <p>Edit profile settings</p>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/about-app" className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <circle cx="20" cy="20" r="20" fill="#EADDFC" />

                <g transform="translate(8, 8)">
                  <path
                    opacity="0.4"
                    d="M22 6.25V11.35C22 12.62 21.58 13.69 20.83 14.43C20.09 15.18 19.02 15.6 17.75 15.6V17.41C17.75 18.09 16.99 18.5 16.43 18.12L15.46 17.48C15.55 17.17 15.59 16.83 15.59 16.47V12.4C15.59 10.36 14.23 9 12.19 9H5.39999C5.25999 9 5.13 9.01002 5 9.02002V6.25C5 3.7 6.7 2 9.25 2H17.75C20.3 2 22 3.7 22 6.25Z"
                    fill="#7356C0"
                  />
                  <path
                    d="M15.59 12.4V16.47C15.59 16.83 15.55 17.17 15.46 17.48C15.09 18.95 13.87 19.87 12.19 19.87H9.47L6.45 21.88C6 22.19 5.39999 21.86 5.39999 21.32V19.87C4.37999 19.87 3.53 19.53 2.94 18.94C2.34 18.34 2 17.49 2 16.47V12.4C2 10.5 3.18 9.19002 5 9.02002C5.13 9.01002 5.25999 9 5.39999 9H12.19C14.23 9 15.59 10.36 15.59 12.4Z"
                    fill="#7356C0"
                  />
                </g>
              </svg>

              <div>
                <span>About App</span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/about" className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <circle cx="20" cy="20" r="20" fill="#EADFFC" />
                <path
                  d="M12.5527 29C11.8178 29 11.2054 28.7725 10.7155 28.3176C10.2385 27.85 10 27.256 10 26.5357C10 25.8154 10.2385 25.234 10.7155 24.7917C11.2054 24.3368 11.8178 24.1093 12.5527 24.1093C13.2875 24.1093 13.8934 24.3368 14.3704 24.7917C14.8604 25.234 15.1053 25.8154 15.1053 26.5357C15.1053 27.256 14.8604 27.85 14.3704 28.3176C13.8934 28.7725 13.2875 29 12.5527 29Z"
                  fill="#7356C0"
                />
                <path
                  d="M19.1638 28.8567L12.7821 11H16.6498L23.0314 28.8567H19.1638Z"
                  fill="#7356C0"
                />
                <path
                  d="M26.1323 28.8567L19.7507 11H23.6184L30 28.8567H26.1323Z"
                  fill="#7356C0"
                />
              </svg>
              <div>
                <span>About Test Mentor</span>
              </div>
            </Link>
          </li>
          <li>
            <button  className="flex items-center" onClick={() => logout(router)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <circle cx="20" cy="20" r="20" fill="#EADDFC" />

                <g transform="translate(8, 8)">
                  <path
                    opacity="0.4"
                    d="M13.2401 22C13.7101 22 14.1001 21.62 14.1001 21.14L14.1001 2.86C14.1001 2.38 13.7201 2 13.2401 2C7.3501 2 3.2401 6.11 3.2401 12C3.2401 17.89 7.3601 22 13.2401 22Z"
                    fill="#7356C0"
                  />
                  <path
                    d="M20.5401 12.53L17.7001 15.38C17.4101 15.67 16.9301 15.67 16.6401 15.38C16.3501 15.09 16.3501 14.61 16.6401 14.32L18.2001 12.75L8.63008 12.75C8.22008 12.75 7.88008 12.41 7.88008 12C7.88008 11.59 8.22008 11.25 8.63008 11.25L18.2001 11.25L16.6301 9.69C16.3401 9.4 16.3401 8.92 16.6301 8.63C16.7801 8.48 16.9701 8.4 17.1601 8.4C17.3501 8.4 17.5401 8.47 17.6901 8.62L20.5301 11.47C20.8301 11.76 20.8301 12.24 20.5401 12.53Z"
                    fill="#7356C0"
                  />
                </g>
              </svg>

              <div>
                <span>Logout</span>
              </div>
            </button>
          </li>
        </ul>
      </div>
      <Navigation page="profile" />
    </main>
  );
}

export default Profile;
