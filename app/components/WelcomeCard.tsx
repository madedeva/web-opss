"use client";
import React from 'react';
import { useSession } from "next-auth/react";

type User = {
  id: Number,
  name: string,
  email: string,
  Role: {
    id: Number,
    name: string,
  }
}

const WelcomeCard: React.FC = () => {
  const { data: session } = useSession();
  return (
    <div className="bg-white rounded-lg overflow-hidden w-full">
      <div className="px-6 py-6 sm:px-10 sm:py-10 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mr-4">
            <img
              src={"https://ui-avatars.com/api/?name=" + session?.user?.name + "&background=0D8ABC&color=fff"} 
              alt={session?.user?.name || "Admin"}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-800">Welcome back, {session?.user?.name}</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Here's an overview of everything that's going on with your works today, so you can stay updated and easily track your progress and next steps.
            </p>
            {session?.user?.roleName && (
              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                You are logged in as <span className='font-bold'> {session?.user?.roleName}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;
