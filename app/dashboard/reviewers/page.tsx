import DashboardLayout from "@/app/components/DashboardLayout"
import WelcomeCard from "@/app/components/WelcomeCard";
import AddConference from "../conference/addConference";
import { PrismaClient } from "@prisma/client";
import AddReviewer from "./addReviewer";
import DeleteConRev from "./deleteProduct";

const prisma = new PrismaClient();

const getConRev = async () => {
    const res = await prisma.con_Reviewer.findMany({
        include: {
            user: {
              select: {
                  name: true,
                  email: true,
              },
            },
            conference: {
              select: {
                institution: true,
              }
            },
        },
    });
    return res;
};

const getUserReviewer = async () => {
  const res = await prisma.user.findMany({
    where: {
      roleId: 2
    }
  });
  return res;
}

const getConference = async () => {
  const res = await prisma.conference.findMany();
  return res;
}

const Reviewer =  async () => {
    const [conRev, user, conference] = await Promise.all([getConRev(), getUserReviewer(), getConference()]);

    return (
    <DashboardLayout>
        <WelcomeCard />

        <div className="bg-white p-6 rounded-lg mt-4">
        <div className="mt-6">
          <h3 className="text-lg font-medium">Reviewer</h3>
          <p className="text-sm text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <hr className="mt-2"/>
          <div className="mt-4">
            <AddReviewer conferences={conference} users={user} />
          </div>
          <table className="table-auto min-w-full bg-white mt-6">
            <thead>
              <tr>
                <th className="py-2 text-start">Reviewer Name</th>
                <th className="py-2 text-start">Institution</th>
                <th className="py-2 text-start">Email</th>
                <th className="py-2 text-start">Action</th>
              </tr>
            </thead>
            <tbody>
              {conRev.map((cr, index) => (
                <tr className="text-gray-700" key={cr.id}>
                  <td className="py-2">{cr.user.name}</td>
                  <td className="py-2">{cr.conference.institution}</td>
                  <td className="py-2">{cr.user.email}</td>
                  <td className="py-2">
                      <DeleteConRev conRev={cr}/>
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

export default Reviewer