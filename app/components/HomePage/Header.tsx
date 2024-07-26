import { useState } from 'react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-blue-950 text-white">
      <div className="container mx-auto flex justify-between items-center py-6 px-4">
        <h1 className="text-xl font-bold">Online Paper Submission System</h1>
        <nav className="hidden md:flex items-center">
          <a href="/" className="px-4">Home</a>
          <a href="/about" className="px-4">About Us</a>
          <a href="/signin" className="px-4">
            <button className="bg-orange-500 text-white py-2 px-4 rounded">Sign In</button>
          </a>
        </nav>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
      {isMenuOpen && (
        <nav className="md:hidden bg-blue-950">
          <a href="/" className="block px-4 py-2">Home</a>
          <a href="/about" className="block px-4 py-2">About Us</a>
          <a href="/signin" className="block px-4 py-2">
            <button className="bg-orange-500 text-white py-2 px-4 rounded">Sign In</button>
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;