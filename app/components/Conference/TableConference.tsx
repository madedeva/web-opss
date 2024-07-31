'use client'
import DeleteConference from "@/app/dashboard/conference/deleteConference";
import UpdateConference from "@/app/dashboard/conference/updateConference";
import { Conference, PrismaClient, User } from "@prisma/client";
import { useSession } from "next-auth/react";


const getOrdinalSuffix = (day: number) => {
  if (day > 3 && day < 21) return 'th'; // exceptions for 11th, 12th, 13th
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

const TableConference = ({conference}:{ conference:  Conference[]}) => {

    const { data: session } = useSession();

    const user = session?.user as User;

    const filteredConferences = conference.filter(conference => conference.userId === user?.id);

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white mt-6 text-left">
        <thead>
          <tr className="text-sm">
            <th className="py-2 w-60">Conference Name</th>
            <th className="py-2">Conference Date</th>
            <th className="py-2">Submission Deadline</th>
            <th className="py-2">Statistic</th>
            <th className="py-2">Status</th>
            <th className="py-2">Action</th>
          </tr>
        </thead>
        <tbody>
        {filteredConferences.map((conference) => (
          <tr className="text-gray-700 text-sm text-left" key={conference.id}>
            <td className="py-2">{conference.name}</td>
            <td className="py-2 w-60">
              <p>Conference Date</p>
              <p>{getFormattedDate(conference.startDate)} - {getFormattedDate(conference.endDate)}</p>
            </td>
            <td className="py-2 w-60">
                <p>Full Paper Submission</p>
                <p>{getFormattedDate(conference.submission_deadlineStart)} - {getFormattedDate(conference.submission_deadlineEnd)}</p>
            </td>
            <td className="py-2">
              <p>Author</p>
              <p><a className="underline" href="#">Registered Authors - 10</a></p>
              <p className="mt-4">Paper</p>
              <p><a className="underline" href="#">Submitted Paper - 10</a></p>
            </td>
            <td className="py-2">
              <p className={conference.status === 'Active' ? 'text-green-500' : 'text-red-500'}>
                  {conference.status.charAt(0).toUpperCase() + conference.status.slice(1)}
              </p>
            </td>
            <td className="py-2">
                <DeleteConference conference={conference}/>
                <UpdateConference conference={conference}/>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
    )
};

export default TableConference 
