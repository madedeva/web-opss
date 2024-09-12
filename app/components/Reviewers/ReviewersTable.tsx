'use client';
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import type { Conference, User } from "@prisma/client";
import DeleteConRev from "@/app/dashboard/reviewers/deleteReviewer";
import UpdateReviewer from "@/app/dashboard/reviewers/updateReviewer";
import AddReviewer from "@/app/dashboard/reviewers/addReviewer";

interface CustomSessionUser {
  id: string;
  name?: string;
  email?: string;
  image?: string;
}

interface ConReviewer {
  id: number;
  name: string;
  conferenceId: number;
  userId: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
  conference: {
    name: string;
    institution: string;
    email: string;
    userId: number;
  };
}

const ReviewerComponent = ({ users, conferences }: { users: User[]; conferences: Conference[] }) => {
  const [reviewers, setReviewers] = useState<ConReviewer[]>([]);
  const { data: session } = useSession();
  const [selectedConference, setSelectedConference] = useState<number | null>(null);

  useEffect(() => {
    if (session?.user) {
      const fetchReviewers = async () => {
        const user = session!.user as CustomSessionUser;
        try {
          const res = await fetch(`/api/reviewer?userId=${user.id}`);
          const data = await res.json();
          setReviewers(data);
        } catch (error) {
          console.error("Error fetching reviewers:", error);
        }
      };
  
      fetchReviewers();
      const interval = setInterval(fetchReviewers, 5000); // Poll every 5 seconds
  
      return () => clearInterval(interval); // Clean up on unmount
    }
  }, [session?.user]);  

  const handleConferenceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedConference(value ? parseInt(value, 10) : null);
  };

  // Filter reviewers by the selected conference
  const filteredReviewers = selectedConference === null 
    ? reviewers 
    : reviewers.filter(reviewer => reviewer.conferenceId === selectedConference);

  const groupedByConference = filteredReviewers.reduce((acc, reviewer) => {
    const conferenceId = reviewer.conferenceId;
    if (!acc.has(conferenceId)) {
      acc.set(conferenceId, {
        id: conferenceId,
        name: reviewer.conference.name,
        reviewers: [],
      });
    }
    acc.get(conferenceId)!.reviewers.push(reviewer);
    return acc;
  }, new Map<number, { id: number; name: string; reviewers: ConReviewer[] }>());

  const groupedByConferenceArray = Array.from(groupedByConference.values());

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        {/* Conference Filter Dropdown */}
        <div className="form-control w-1/2">
          <label htmlFor="conference" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Conference
          </label>
          <select
            value={selectedConference ?? ''}
            onChange={handleConferenceChange}
            className="select select-bordered bg-white"
          >
            <option value="">All Conferences</option>
            {conferences.map((conference) => (
              <option key={conference.id} value={conference.id}>
                {conference.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Reviewer Table */}
      {groupedByConferenceArray.length > 0 ? (
        groupedByConferenceArray.map((conf) => (
          <div key={conf.id} className="mt-12">
            <h4 className="text-md font-medium mt-2">{conf.name}</h4>
            <table className="min-w-full divide-y divide-gray-200 mt-6">
              <thead className="bg-gray-50">
                <tr className="text-xs border-b border-gray-200">
                  <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reviewer Name
                  </th>
                  <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Organizer Institution
                  </th>
                  <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Organizer Email
                  </th>
                  <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {conf.reviewers.map((cr) => (
                  <tr className="text-gray-700 text-xs border-b border-gray-200" key={cr.id}>
                    <td className="py-2">{cr.user.name}</td>
                    <td className="py-2">{cr.conference.institution}</td>
                    <td className="py-2">{cr.user.email}</td>
                    <td className="flex py-2">
                      <UpdateReviewer
                        conferences={conferences}
                        users={users}
                        userId={cr.user.id}
                        conId={cr.conferenceId}
                        conRevId={cr.id}
                      />
                      <DeleteConRev 
                        conRev={{ 
                          id: cr.id, 
                          conferenceId: cr.conferenceId, 
                          userId: cr.userId // Make sure to include userId
                        }} 
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <p>No reviewers found.</p>
      )}
    </div>
  );
};

export default ReviewerComponent;
