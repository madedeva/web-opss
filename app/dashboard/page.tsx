"use client";

import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import WelcomeCard from '../components/WelcomeCard';
import Product from './products/page';

const Dashboard = () => {

  return (
    <DashboardLayout>

      <WelcomeCard />
        
    </DashboardLayout>
  );
};

export default Dashboard;
