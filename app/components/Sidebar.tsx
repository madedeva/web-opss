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
        <li className={`relative ${currentPath === '/dashboard' ? 'bg-orange-500 rounded' : ''}`}>
            <a href="/dashboard" className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white font-semibold text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-orange-500 transition duration-300 ease-in-out">
            <svg width="32px" height="32px" viewBox="-6 -6 36.00 36.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M15 18H9" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
            Dashboard
            </a>
        </li>
        <li className={`relative ${currentPath === '/dashboard/products' ? 'bg-orange-500 rounded' : ''}`}>
            <a href="/dashboard/products" className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white font-semibold text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-orange-500  mt-2 transition duration-300 ease-in-out">
            <svg width="32px" height="32px" viewBox="-6 -6 36.00 36.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
              Products
            </a>
        </li>
        <li className={`relative ${currentPath === '/dashboard/conference' ? 'bg-orange-500 rounded' : ''}`}>
            <a href="/dashboard/conference" className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white font-semibold text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-orange-500 mt-2 transition duration-300 ease-in-out">
            <svg width="32px" height="32px" viewBox="-6 -6 36.00 36.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.7071 2.29292C21.9787 2.56456 22.0707 2.96779 21.9438 3.33038L15.3605 22.14C14.9117 23.4223 13.1257 23.4951 12.574 22.2537L9.90437 16.2471L17.3676 7.33665C17.7595 6.86875 17.1312 6.24038 16.6633 6.63229L7.75272 14.0956L1.74631 11.426C0.504876 10.8743 0.577721 9.08834 1.85999 8.63954L20.6696 2.05617C21.0322 1.92926 21.4354 2.02128 21.7071 2.29292Z" fill="#ffffff"></path> </g></svg>
              Conference
            </a>
        </li>
        <li className={`relative ${currentPath === '/dashboard/users' ? 'bg-orange-500 rounded' : ''}`}>
            <a href="/dashboard/users" className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white font-semibold text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-orange-500 mt-2 transition duration-300 ease-in-out">
            <svg width="32px" height="32px" viewBox="-256 -256 1536.00 1536.00" fill="#ffffff" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M962.4 1012.8s0 0.8 0 0h25.6-25.6zM704 338.4C704 195.2 588.8 78.4 445.6 78.4S187.2 195.2 187.2 338.4s116 260 258.4 260S704 481.6 704 338.4z m-472 0c0-118.4 96-214.4 213.6-214.4s213.6 96 213.6 214.4-96 214.4-213.6 214.4S232 456.8 232 338.4z" fill=""></path><path d="M456.8 621.6c196.8 0 361.6 136 394.4 324h45.6C863.2 732 677.6 576.8 456 576.8c-221.6 0-406.4 155.2-440.8 368.8h45.6C96 756.8 260 621.6 456.8 621.6z" fill=""></path><path d="M770.4 578.4l-24-8.8 20.8-14.4c65.6-46.4 104.8-122.4 103.2-202.4-1.6-128-102.4-232.8-228-241.6v47.2c100 8.8 180 92.8 180.8 194.4 0.8 52.8-19.2 102.4-56 140.8-36.8 37.6-86.4 59.2-139.2 60-24.8 0-50.4 0-75.2 1.6-15.2 1.6-41.6 0-54.4 9.6-1.6 0.8-3.2 0-4.8 0l-9.6 12c-0.8 1.6-2.4 3.2-4 4.8 0.8 1.6-0.8 16 0 17.6 12 4 71.2 0 156.8 2.4 179.2 1.6 326.4 160.8 340.8 338.4l47.2 3.2c-9.6-156-108-310.4-254.4-364.8z" fill=""></path></g></svg>
              Users
            </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
