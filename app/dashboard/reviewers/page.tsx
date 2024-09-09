'use client'
import DashboardLayout from "@/app/components/DashboardLayout";
import ReviewerComponent from "@/app/components/Reviewers/ReviewersTable";
import AddReviewer from "./addReviewer";
import { useEffect, useState } from "react";

interface ConReviewer {
  id: number;
  name: string;
  conferenceId: number;
  user: {
    name: string;
    email: string;
  };
  conference: {
    name: string;
    institution: string;
    email: string
  };
}

const Reviewer = () => {

  const [conferences, setConferences] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const conferenceRes = await fetch("/api/conferences");
        const userRes = await fetch("/api/users");
        const conferenceData = await conferenceRes.json();
        const userData = await userRes.json();

        setConferences(conferenceData);
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
  
  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded-lg">
        <div className="mt-6">
          <h3 className="text-lg font-medium">Reviewers</h3>
          <p className="text-sm text-gray-600">
            Below is a list of reviewers according to the conference you have.
          </p>
          <div className="mt-2">
            <AddReviewer conferences={conferences} users={users} />
          </div>
          <ReviewerComponent />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reviewer;
