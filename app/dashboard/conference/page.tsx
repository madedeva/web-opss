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

        <div className="mt-4">
            <h1 className="text-lg font-semibold text-gray-800">Conference Page</h1>

            <div className="bg-white rounded-lg overflow-hidden w-full mt-4">
                <div className="mb-2 px-4 py-4">
                    <AddConference/>
                </div>

                <table className="table mb-4">
                    <thead className="text-sm text-black">
                        <tr>
                            <th>Number</th>
                            <th>Title</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Chair</th>
                            <th>Location</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {conference.map((conference, index) => (
                            <tr key={conference.id}>
                                <td>{index + 1}</td>
                                <td>{conference.name}</td>
                                {/* date format dd mm yyyy */}
                                <td>{new Date(conference.startDate).toLocaleDateString()}</td>
                                <td>{new Date(conference.endDate).toLocaleDateString()}</td>
                                <td>{conference.User?.name}</td>
                                <td>{conference.address}</td>
                                <td className="flex space-x-1">
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