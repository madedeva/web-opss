'use client'
import DeleteConference from "@/app/dashboard/conference/deleteConference";
import UpdateConference from "@/app/dashboard/conference/updateConference";
import { Conference, PrismaClient, User } from "@prisma/client";
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

const TableConference = ({conference}:{ conference:  Conference[]}) => {

    const { data: session } = useSession();

    const user = session?.user as User;

    const filteredConferences = conference.filter(conference => conference.userId === user?.id);

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white mt-6 text-left border border-gray-200 rounded-lg">
          <thead>
              <tr className="text-xs border-b border-gray-200">
                  <th className="py-2 px-4 border-r border-gray-200 w-60">Conference Name</th>
                  <th className="py-2 px-4 border-r border-gray-200">Conference Date</th>
                  <th className="py-2 px-4 border-r border-gray-200">Submission Deadline</th>
                  <th className="py-2 px-4 border-r border-gray-200">Statistic</th>
                  <th className="py-2 px-4 border-r border-gray-200">Status</th>
                  <th className="py-2 px-4">Action</th>
              </tr>
          </thead>
          <tbody>
              {filteredConferences.map((conference) => (
                  <tr key={conference.id} className="text-gray-700 text-xs border-b border-gray-200">
                      <td className="py-2 px-4 border-r border-gray-200">{conference.name}</td>
                      <td className="py-2 px-4 border-r border-gray-200 w-60">
                          <p className="text-xs">Conference Date</p>
                          <p>{getFormattedDate(conference.startDate)} - {getFormattedDate(conference.endDate)}</p>
                      </td>
                      <td className="py-2 px-4 border-r border-gray-200 w-60">
                          <p className="text-xs">Full Paper Submission</p>
                          <p>{getFormattedDate(conference.submission_deadlineStart)} - {getFormattedDate(conference.submission_deadlineEnd)}</p>
                      </td>
                      <td className="py-2 px-4 border-r border-gray-200">
                          <p><a className="underline text-blue-950 text-xs" href="#">Submitted Paper: 10</a></p>
                      </td>
                      <td className="py-2 px-4 border-r border-gray-200">
                          {conference.status === 'Active' ? (
                              <div className="badge badge-success gap-2">
                                  <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      className="inline-block h-4 w-4 stroke-current"
                                  >
                                      <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M5 13l4 4L19 7"
                                      ></path>
                                  </svg>
                                  <span className="text-xs">Active</span>
                              </div>
                          ) : (
                              <div className="badge badge-error gap-2">
                                  <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      className="inline-block h-4 w-4 stroke-current"
                                  >
                                      <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M6 18L18 6M6 6l12 12"
                                      ></path>
                                  </svg>
                                  <span className="text-xs">Inactive</span>
                              </div>
                          )}
                      </td>
                      <td className="py-2 px-4">
                          <button className="btn btn-ghost btn-xs text-white bg-transparent">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#28a745" className="bi bi-eye" viewBox="0 0 16 16">
                                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                              </svg>
                          </button>
                          <UpdateConference conference={conference}/>
                          <DeleteConference conference={conference}/>
                      </td>
                  </tr>
              ))}
          </tbody>
      </table>
    </div>
    )
};

export default TableConference 
