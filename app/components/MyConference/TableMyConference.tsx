'use client';
import DeleteConference from "@/app/dashboard/conference/deleteConference";
import UpdateConference from "@/app/dashboard/conference/updateConference";
import { RegisterConference, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState } from "react";

const getOrdinalSuffix = (day: number) => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
  }
};

const getFormattedDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString('en-US', { month: 'long' });
  const year = dateObj.getFullYear();
  const suffix = getOrdinalSuffix(day);
  return `${month} ${day}${suffix}, ${year}`;
};

type UserCon = {
  country: string,
  userId: number,
  id: number,
  status: string,
  paper_title: string,
  comments?: string, // Changed from string | undefined to string | null
  user: {
      name: string,
      email: string,
  },
  conference: {
    id: number,
    name: string,
    description: string,
    submission_deadlineStart: Date,
    submission_deadlineEnd: Date,
    paper_template: string,
    User: {
        name: string,
        email: string,
    };
  }
}

const TableMyConference = ({ reg_conference }: { reg_conference: UserCon[] }) => {
  const [selectedComments, setSelectedComments] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = (comments: string | undefined) => {
    setSelectedComments(comments ?? null); // Convert undefined to null
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const { data: session } = useSession();
  const user = session?.user as User;

  const filteredRegConferences = reg_conference.filter(reg => reg.userId === user?.id);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white mt-6 text-left">
        <thead>
          <tr className="text-xs">
            <th className="py-2">Conference Name</th>
            <th className="py-2">Paper Title</th>
            <th className="py-2">Comments</th>
            <th className="py-2">Status</th>
            <th className="py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredRegConferences.map((reg_conference) => (
            <tr className="text-gray-700 text-xs text-left" key={reg_conference.id}>
              <td className="py-2">{reg_conference.conference.name}</td>
              <td className="py-2">{reg_conference.paper_title}</td>
              <td className="py-2">
                <button
                  className="btn btn-ghost btn-xs text-blue-950 underline"
                  onClick={() => handleModalOpen(reg_conference.comments)}
                >
                  View comments
                </button>
              </td>
              <td className="py-2">{reg_conference.status}</td>
              <td className="py-2">
                {/* Add your actions here */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box bg-white">
            <h3 className="font-bold text-lg">Reviewer Comments</h3>
            <p className="py-4">
              {selectedComments
                ? selectedComments
                : 'No comments available'}
            </p>
            <div className="modal-action">
              <button type="button" className="btn text-white" onClick={handleModalClose}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableMyConference;
