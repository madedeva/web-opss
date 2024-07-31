'use client'
import DeleteConference from "@/app/dashboard/conference/deleteConference";
import UpdateConference from "@/app/dashboard/conference/updateConference";
import { Conference, PrismaClient, User } from "@prisma/client";
import { useSession } from "next-auth/react";

const TableConference = ({conference}:{ conference:  Conference[]}) => {

    const { data: session } = useSession();

    const user = session?.user as User;

    const filteredConferences = conference.filter(conference => conference.userId === user?.id);

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white mt-6 text-left">
        <thead>
          <tr>
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
          <tr className="text-gray-700" key={conference.id}>
            <td className="py-2">{conference.name}</td>
            <td className="py-2px-4">
              <p>Date Start</p>
              <p>{new Date(conference.startDate).toLocaleDateString()}</p>
              <p className="mt-4">Date End</p>
              <p>{new Date(conference.endDate).toLocaleDateString()}</p>
            </td>
            <td className="py-2">
                <p>Full Paper Submission</p>
                <p>{new Date(conference.submission_deadline).toLocaleDateString()}</p>
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
