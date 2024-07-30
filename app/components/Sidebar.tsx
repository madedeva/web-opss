"use client";
import React from 'react';
import Link, { LinkProps } from "next/link";
import { usePathname } from 'next/navigation'

interface SidebarProps {
  isVisible: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isVisible }) => {
  const currentPath = usePathname();
  return (
    <div className={`w-64 h-full shadow-md bg-blue-950 px-1 absolute transition-transform ${isVisible ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-12 px-10 py-10 border-b">
            <img src="/logo/opss-logo.png" alt="OPSS Logo" className="w-36"/>
        </div>
      <ul className="relative mt-4">

        {/* role opeator */}
        <li className={`relative ${currentPath === '/dashboard' ? 'bg-orange-500 rounded' : ''}`}>
            <a href="/dashboard" className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white font-semibold text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-orange-500 transition duration-300 ease-in-out">
            <svg width="32px" height="32px" viewBox="-6 -6 36.00 36.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M15 18H9" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
            Dashboard
            </a>
        </li>
        {/* <li className={`relative ${currentPath === '/dashboard/products' ? 'bg-orange-500 rounded' : ''}`}>
            <a href="/dashboard/products" className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white font-semibold text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-orange-500  mt-2 transition duration-300 ease-in-out">
            <svg width="32px" height="32px" viewBox="-6 -6 36.00 36.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
              Products
            </a>
        </li> */}
        <li className={`relative ${currentPath === '/dashboard/conference' ? 'bg-orange-500 rounded' : ''}`}>
        <a href="/dashboard/conference" className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white font-semibold text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-orange-500 mt-2 transition duration-300 ease-in-out">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-video3" viewBox="0 0 16 16">
            <path d="M14 9.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-6 5.7c0 .8.8.8.8.8h6.4s.8 0 .8-.8-.8-3.2-4-3.2-4 2.4-4 3.2"/>
            <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h5.243c.122-.326.295-.668.526-1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v7.81c.353.23.656.496.91.783Q16 12.312 16 12V4a2 2 0 0 0-2-2z"/>
          </svg>
          <span className="ml-2">Conferences</span>
        </a>
        </li>
        <li className={`relative ${currentPath === '/dashboard/authors' ? 'bg-orange-500 rounded' : ''}`}>
            <a href="/dashboard/authors" className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white font-semibold text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-orange-500 mt-2 transition duration-300 ease-in-out">
            <svg width="32px" height="32px" viewBox="-256 -256 1536.00 1536.00" fill="#ffffff" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M962.4 1012.8s0 0.8 0 0h25.6-25.6zM704 338.4C704 195.2 588.8 78.4 445.6 78.4S187.2 195.2 187.2 338.4s116 260 258.4 260S704 481.6 704 338.4z m-472 0c0-118.4 96-214.4 213.6-214.4s213.6 96 213.6 214.4-96 214.4-213.6 214.4S232 456.8 232 338.4z" fill=""></path><path d="M456.8 621.6c196.8 0 361.6 136 394.4 324h45.6C863.2 732 677.6 576.8 456 576.8c-221.6 0-406.4 155.2-440.8 368.8h45.6C96 756.8 260 621.6 456.8 621.6z" fill=""></path><path d="M770.4 578.4l-24-8.8 20.8-14.4c65.6-46.4 104.8-122.4 103.2-202.4-1.6-128-102.4-232.8-228-241.6v47.2c100 8.8 180 92.8 180.8 194.4 0.8 52.8-19.2 102.4-56 140.8-36.8 37.6-86.4 59.2-139.2 60-24.8 0-50.4 0-75.2 1.6-15.2 1.6-41.6 0-54.4 9.6-1.6 0.8-3.2 0-4.8 0l-9.6 12c-0.8 1.6-2.4 3.2-4 4.8 0.8 1.6-0.8 16 0 17.6 12 4 71.2 0 156.8 2.4 179.2 1.6 326.4 160.8 340.8 338.4l47.2 3.2c-9.6-156-108-310.4-254.4-364.8z" fill=""></path></g></svg>
              Authors
            </a>
        </li>
        <li className={`relative ${currentPath === '/dashboard/reviewers' ? 'bg-orange-500 rounded' : ''}`}>
        <a href="/dashboard/reviewers" className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white font-semibold text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-orange-500 mt-2 transition duration-300 ease-in-out">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-square mr-2" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
          </svg>
          Reviewers
        </a>
        </li>
        <li className={`relative ${currentPath === '/dashboard/papers' ? 'bg-orange-500 rounded' : ''}`}>
        <a href="/dashboard/papers" className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white font-semibold text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-orange-500 mt-2 transition duration-300 ease-in-out">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-file-earmark-bar-graph-fill" viewBox="0 0 16 16">
            <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1m.5 10v-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5m-2.5.5a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5zm-3 0a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5z"/>
          </svg>
          <span className="ml-2">Papers</span>
        </a>
        </li>
      </ul>

      {/* role author */}
      <hr />
      
      <ul>
        <li className={`relative ${currentPath === '/dashboard/myconferences' ? 'bg-orange-500 rounded' : ''}`}>
        <a href="/dashboard/myconferences" className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white font-semibold text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-orange-500 mt-2 transition duration-300 ease-in-out">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-video3" viewBox="0 0 16 16">
            <path d="M14 9.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-6 5.7c0 .8.8.8.8.8h6.4s.8 0 .8-.8-.8-3.2-4-3.2-4 2.4-4 3.2"/>
            <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h5.243c.122-.326.295-.668.526-1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v7.81c.353.23.656.496.91.783Q16 12.312 16 12V4a2 2 0 0 0-2-2z"/>
          </svg>
          <span className="ml-2">My Conferences</span>
        </a>
        </li>
        <li className={`relative ${currentPath === '/dashboard/mypapers' ? 'bg-orange-500 rounded' : ''}`}>
        <a href="/dashboard/mypapers" className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white font-semibold text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-orange-500 mt-2 transition duration-300 ease-in-out">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-file-earmark-bar-graph-fill" viewBox="0 0 16 16">
            <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1m.5 10v-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5m-2.5.5a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5zm-3 0a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5z"/>
          </svg>
          <span className="ml-2">My Papers</span>
        </a>
        </li>
      </ul>

      {/* role reviewer */}
      <hr />

      <ul>
        <li className={`relative ${currentPath === '/dashboard/myreviews' ? 'bg-orange-500 rounded' : ''}`}>
        <a href="/dashboard/myreviews" className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white font-semibold text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-orange-500 mt-2 transition duration-300 ease-in-out">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-square mr-2" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
          </svg>
          My Reviews
        </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
