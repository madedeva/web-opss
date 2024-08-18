'use client'
import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import WelcomeCard from '../components/WelcomeCard';
import { useSession } from 'next-auth/react';
import { User } from '@prisma/client';

const Dashboard = () => {

  // const { data: session, status } = useSession();

  // if (!session?.user) return null;

  // const user = session.user as User;
  // const roleId = user.roleId

  return (
    <DashboardLayout>
      <WelcomeCard />

      <div className="mt-4">
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <section className="bg-white p-4 rounded">
            <h3 className="text-lg mb-2">Conferences</h3>
            <hr className="mb-4 mt-4" />
            <ul>
              <li><a href="/dashboard/conference" className="text-blue-950 underline">Conferences List</a></li>
              <li><a href="/dashboard/conference" className="text-blue-950 underline">Create Conferences</a></li>
            </ul>
          </section>
          <section className="bg-white p-4 rounded">
            <h3 className="text-lg mb-2">Reviewers</h3>
            <hr className="mb-4 mt-4" />
            <ul>
              <li><a href="/dashboard/reviewers" className="text-blue-950 underline">Reviewers List</a></li>
              <li><a href="/dashboard/reviewers" className="text-blue-950 underline">Add Reviewers</a></li>
            </ul>
          </section>
          <section className="bg-white p-4 rounded">
            <h3 className="text-lg mb-2">Submitted Papers</h3>
            <hr className="mb-4 mt-4" />
            <ul>
              <li><a href="/dashboard/papers" className="text-blue-950 underline">Submitted Papers</a></li>
            </ul>
          </section>
        </main>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
