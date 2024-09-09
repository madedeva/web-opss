'use client'
import DeleteConRev from "@/app/dashboard/reviewers/deleteReviewer";
import UpdateReviewer from "@/app/dashboard/reviewers/updateReviewer";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

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
  user: {
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

const ReviewerComponent = () => {
  const [reviewers, setReviewers] = useState<ConReviewer[]>([]);
  const { data: session } = useSession();
  const [conferenceId, setConferenceId] = useState<number>(0);

  useEffect(() => {
    console.log('Session:', session);

    async function fetchReviewers() {
      if (!session || !session.user) return;

      const user = session.user as CustomSessionUser;
      if (!user.id) {
        console.error('User ID is missing');
        return;
      }

      try {
        const res = await fetch(`/api/reviewers?userId=${user.id}&conferenceId=${conferenceId}`);
        const data = await res.json();
        setReviewers(data);
      } catch (error) {
        console.error('Error fetching reviewers:', error);
      }
    }

    fetchReviewers();
  }, [session, conferenceId]);

  const groupedByConference = reviewers.reduce((acc, reviewer) => {
    const conferenceId = reviewer.conferenceId;
    if (!acc.has(conferenceId)) {
      acc.set(conferenceId, {
        id: conferenceId,
        name: reviewer.conference.name,
        reviewers: [],
      });
    }
    acc.get(conferenceId).reviewers.push(reviewer);
    return acc;
  }, new Map<number, any>());

  const groupedByConferenceArray = Array.from(groupedByConference.values());

  return (
    <div className="mt-6">
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
                {conf.reviewers.map((cr:any) => (
                  <tr className="text-gray-700 text-xs border-b border-gray-200" key={cr.id}>
                    <td className="py-2">{cr.user.name}</td>
                    <td className="py-2">{cr.conference.institution}</td>
                    <td className="py-2">{cr.user.email}</td>
                    <td className="flex py-2">
                      <UpdateReviewer
                        conferences={conf}
                        users={cr.user}
                        userId={cr.user.id}
                        conId={cr.conferenceId}
                        conRevId={cr.id}
                      />
                      <DeleteConRev conRev={cr} />
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
