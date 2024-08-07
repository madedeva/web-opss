// components/HomePage/Header.tsx
import { useState } from 'react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-blue-950 text-white">
      <div className="container mx-auto flex justify-between items-center py-6 px-4">
        {/* Logo atau Brand */}
        <h1 className="text-xl font-bold">Online Paper Submission System</h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center">
          <a href="/" className="px-4 py-2 hover:bg-blue-800 rounded">Home</a>
          <a href="/about-us" className="px-4 py-2 hover:bg-blue-800 rounded">About Us</a>
          <a href="/signin" className="px-4 py-2">
            <button className="bg-orange-500 text-white py-2 px-4 rounded">Sign In</button>
          </a>
        </nav>

        {/* Hamburger Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isMenuOpen ? (
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div 
        className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-blue-950 transition-all duration-300 ease-in-out`}
        style={{ maxHeight: isMenuOpen ? '200px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease-in-out' }}
      >
        <a href="/" className="block px-4 py-2 text-white hover:bg-blue-800">Home</a>
        <a href="/about-us" className="block px-4 py-2 text-white hover:bg-blue-800">About Us</a>
        <a href="/signin" className="block px-4 py-2 text-white">
          <button className="bg-orange-500 text-white py-2 px-4 rounded">Sign In</button>
        </a>
      </div>
    </header>
  );
};

export default Header;