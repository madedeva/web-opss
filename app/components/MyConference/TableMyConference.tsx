'use client'
import DeleteConference from "@/app/dashboard/conference/deleteConference";
import UpdateConference from "@/app/dashboard/conference/updateConference";
import { RegisterConference, User } from "@prisma/client";
import { useSession } from "next-auth/react";

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
  user: {
      name: string,
      email: string,
  },
  conference: {
    id: number,
    name: string,
    description: string,
    submission_deadlineStart: Date
    submission_deadlineEnd: Date
    paper_template: string
      User: {
          name: string,
          email: string,
      };
  }
}

const TableMyConference = ({ reg_conference }: { reg_conference: UserCon[] }) => {
    const { data: session } = useSession();
    const user = session?.user as User;

    const filteredRegConferences = reg_conference.filter(reg => reg.userId === user?.id);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white mt-6 text-left">
        <thead>
          <tr className="text-sm">
            <th className="py-2">Conference Name</th>
            <th className="py-2">Full Paper Submission</th>
            <th className="py-2">Paper Template</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
        {filteredRegConferences.map((reg_conference) => (
            <tr className="text-gray-700 text-sm text-left" key={reg_conference.id}>
              <td className="py-2">{reg_conference.conference.name}</td>
              <td className="py-2">{getFormattedDate(reg_conference.conference.submission_deadlineStart)} - {getFormattedDate(reg_conference.conference.submission_deadlineEnd)}</td>
              <td className="py-2">
                <a
                  href={`/api/templates/${reg_conference.conference.paper_template}`}
                  download
                  className="text-blue-600 underline"
                >
                  Download Template
                </a>
              </td>
              {/* <td className="py-2">{reg_conference.conference.paper_template}</td> */}
              <td className="py-2">
                {/* <UpdateConference reg_con={reg_con} />
                <DeleteConference reg_con={reg_con} /> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    );
};

export default TableMyConference;
