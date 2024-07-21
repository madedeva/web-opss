"use client";
import React from 'react';
import { useSession } from "next-auth/react"

const WelcomeCard: React.FC = () => {
  const { data: session } = useSession();
  return (
    <div className="bg-white rounded-lg overflow-hidden w-full">
      <div className="px-10 py-10 flex items-center"> {/* Menambahkan class flex dan items-center */}
        {/* imga circle */}
        <div className="w-20 h-20 rounded-full flex items-center justify-center mr-4"> {/* Menambahkan class flex dan items-center, serta margin-right */}
          <img
            src={"https://ui-avatars.com/api/?name=" + session?.user?.name + "&background=0D8ABC&color=fff"} 
            alt={session?.user?.name || "Admin"}
            className="w-16 h-16 rounded-full"
          />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Welcome back, {session?.user?.name}</h1>
          <p className="text-sm text-gray-500 mt-2">
            Here`s what`s happening with your projects today
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;
