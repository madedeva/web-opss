'use client'
import DashboardLayout from "@/app/components/DashboardLayout";
import ReviewerComponent from "@/app/components/Reviewers/ReviewersTable";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import AddReviewer from "@/app/dashboard/reviewers/addReviewer";

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

const ReviewerPage = () => {

  const [conferences, setConferences] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUserSession] = useState<User>();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status != 'loading') {
      const user = session!.user as User;
      setUserSession(user);
      fetchData();
    }

    async function fetchData() {
      try {
        const conferenceRes = await fetch(`/api/conferences/${user?.id}`);
        const userRes = await fetch("/api/users");
        const conferenceData = await conferenceRes.json();
        const userData = await userRes.json();

        setConferences(conferenceData);
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  }, [user, session?.user]);
  
  return (
      <div className="bg-white p-6 rounded-lg">
        <div className="mt-6">
          <h3 className="text-lg font-medium">Reviewers</h3>
          <p className="text-sm text-gray-600">
            Below is a list of reviewers according to the conference you have.
          </p>
          <div className="mt-2">
            <AddReviewer conferences={conferences} users={users} />
          </div>
          <ReviewerComponent users={users} conferences={conferences} />
        </div>
      </div>
  );
};

export default ReviewerPage;
