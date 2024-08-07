'use client'
import DashboardLayout from "@/app/components/DashboardLayout";
import WelcomeCard from "@/app/components/WelcomeCard";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

const AvailableConference = async () => {
  const conferences = await prisma.conference.findMany({
    where: {
        status: 'Active',
    },
    select: {
        id: true,
        name: true,
        startDate: true,
        submission_deadlineEnd: true,
        submission_deadlineStart: true,
        city: true,
        country: true,
        banner: true,
        slug: true,
        status: true,
        endDate: true
    },
});

  return (
    <DashboardLayout>
      <WelcomeCard />
      <div className="bg-white p-6 rounded-lg mt-4">
        <div className="mt-6">
          <h3 className="text-lg font-medium">Available Conference</h3>
          <p className="text-sm text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <table className="min-w-full bg-white mt-6 text-left border border-gray-200 rounded-lg">
            <thead>
                <tr className="text-xs border-b border-gray-200">
                    <th className="py-2 px-4 border-r border-gray-200 w-60">Conference Name</th>
                    <th className="py-2 px-4 border-r border-gray-200">Conference Date</th>
                    <th className="py-2 px-4 border-r border-gray-200">Submission Deadline</th>
                    <th className="py-2 px-4">Action</th>
                </tr>
            </thead>
            <tbody>
              {conferences.map((conference) => (
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
                        <td className="py-2 px-4 w-20 border-r border-gray-200">
                          <button
                            className="btn btn-ghost btn-xs text-blue-950 underline">
                            Register
                          </button>
                          <button
                            className="btn btn-ghost btn-xs text-blue-950 underline">
                            View details
                          </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AvailableConference;
