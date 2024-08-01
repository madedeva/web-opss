import React, { useState, useRef, useEffect } from 'react';
import { useSession, signOut } from "next-auth/react"

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-md w-full">
      <div className="mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <button onClick={toggleSidebar} className="py-4 px-2 text-black">
              {/* get icon from public/logo/menu.png */}
              <img src="/logo/menu.png" alt="Menu" className="w-6"/>
            </button>
          </div>
          <div className="flex items-center space-x-1 relative">
            <button onClick={toggleDropdown} className="py-5 px-3 flex items-center space-x-2 text-gray-700">
              <img
                src={"https://ui-avatars.com/api/?name=" + session?.user?.name + "&background=0D8ABC&color=fff"}
                alt="Admin"
                className="w-6 h-6 rounded-full"
              />
              <span>{session?.user?.name}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {dropdownOpen && (
              <div ref={dropdownRef} className="absolute right-0 top-10 bg-red-700 rounded-md shadow-lg z-10 mt-2">
                <button onClick={() => signOut()} className="px-4 py-4 w-36 h-12 rounded-md text-white hover:bg-red-600 flex items-center gap-2">
                  Sign Out
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                    <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                  </svg>
                </button>
              </div>            
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
