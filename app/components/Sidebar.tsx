"use client";
import React from 'react';
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react';

interface SidebarProps {
  isVisible: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isVisible }) => {
  // const { data: session, status } = useSession();
  const currentPath = usePathname();

  // if (!session?.user) return null;

  // const userRole = session.user.roleId;
  
  return (
    <div className={`w-64 h-full bg-blue-950 0 px-1 absolute transition-transform ${isVisible ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-12 px-10 py-10 border-b">
            <a href="/"><img src="/logo/opss-logo.png" alt="OPSS Logo" className="w-36"/></a>
        </div>

        {/* oprator */}
        <ul className="relative mt-4">
          <li className={`relative ${currentPath === '/dashboard' ? 'bg-orange-500 rounded' : ''}`}>
              <a href="/dashboard" className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white font-semibold text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-orange-500 transition duration-300 ease-in-out">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-speedometer2" viewBox="0 0 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4M3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707M2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10m9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5m.754-4.246a.39.39 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.39.39 0 0 0-.029-.518z"/>
                <path d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A8 8 0 0 1 0 10m8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3"/>
              </svg>
              <span className='ml-2'>Dashboard</span>
              </a>
          </li>
        </ul>
      
      {/* role opeator */}
      <ul className="relative mt-2">
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
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-person-check" viewBox="0 0 16 16">
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
                <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z"/>
              </svg>
              <span className='ml-2'>Authors</span>
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
        <li className={`relative ${currentPath === '/dashboard/availableconferences' ? 'bg-orange-500 rounded' : ''}`}>
        <a href="/dashboard/availableconferences" className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white font-semibold    text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-orange-500 mt-2 transition duration-300 ease-in-out">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-view-list" viewBox="0 0 16 16">
            <path d="M3 4.5h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zM1 2a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 2m0 12a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 14"/>
          </svg>
          <span className="ml-2">Available Conferences</span>
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
