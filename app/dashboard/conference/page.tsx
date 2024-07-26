import DashboardLayout from "@/app/components/DashboardLayout"
import WelcomeCard from "@/app/components/WelcomeCard";
import { PrismaClient } from "@prisma/client";
import AddConference from "./addConference";
import DeleteConference from "./deleteConference";
import UpdateConference from "./updateConference";

const prisma = new PrismaClient();

const getConference = async () => {
    const res = await prisma.conference.findMany({
        include: {
            User: {
                select: {
                    name: true,
                    email: true,
                },
            },
        },
    });
    return res;
};


const Conference =  async () => {
    const [conference] = await Promise.all([getConference()]);

    return (
    <DashboardLayout>
        <WelcomeCard />

        <div className="bg-white p-6 rounded-lg mt-4">
        <div className="mt-6">
          <h3 className="text-lg font-medium">My Conferences</h3>
          <p className="text-sm text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <hr className="mt-2"/>
          <div className="mt-4">
            <AddConference />
          </div>
          <table className="table-auto min-w-full bg-white mt-6">
            <thead>
              <tr>
                <th className="py-2">Conference Name</th>
                <th className="py-2">Conference Date</th>
                <th className="py-2">Submission Deadline</th>
                <th className="py-2">Statistic</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
            {conference.map((conference, index) => (
              <tr className="text-gray-700" key={conference.id}>
                <td className="py-2">{conference.name}</td>
                <td className="py-2">
                  <p>Date Start: {new Date(conference.startDate).toLocaleDateString()}</p>
                  <p>Date End: {new Date(conference.endDate).toLocaleDateString()}</p>
                </td>
                <td className="py-2">
                    <p>Full Paper Submission</p>
                    <p>January 26, 2024</p>
                </td>
                <td className="py-2">
                  <p><a className="underline" href="#">Author Registered Authors - 10</a></p>
                  <p><a className="underline" href="#">Paper Submitted Paper - 10</a></p>
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
      </div>
    </DashboardLayout>
    )
};

export default Conference