import { useState } from 'react';

const HeaderAuth: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-blue-950 text-white">
        <div className="container mx-auto flex justify-between items-center py-6 px-4">
            <h1 className="text-xl font-bold">Online Paper Submission System</h1>
        </div>
    </header>
  );
};

export default HeaderAuth;