import React, { useState, useRef, useEffect } from 'react';

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
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                alt="Admin"
                className="w-6 h-6 rounded-full"
              />
              <span>Admin</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {dropdownOpen && (
              <div ref={dropdownRef} className="absolute right-0 top-10 w-48 bg-white rounded-md shadow-lg z-10 mt-2">
                <a href="/" className="block px-6 py-4 text-gray-800 hover:bg-gray-100">Logout</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
