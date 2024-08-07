import DashboardLayout from "@/app/components/DashboardLayout";
import WelcomeCard from "@/app/components/WelcomeCard";
import { PrismaClient } from "@prisma/client";
import AddReviewer from "./addReviewer";
import DeleteConRev from "./deleteReviewer";
import UpdateReviewer from "./updateReviewer";

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
        include: {
          User: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });
  return res;
};

const getUserReviewer = async () => {
  const res = await prisma.user.findMany({
    where: {
      roleId: 3,
    },
  });
  return res;
};

const getConference = async () => {
  const res = await prisma.conference.findMany();
  return res;
};

const Reviewer = async () => {
  const [conRev, user, conference] = await Promise.all([getConRev(), getUserReviewer(), getConference()]);

  // Mengelompokkan reviewer berdasarkan conference
  const groupedByConference = conference.map((conf) => {
    return {
      ...conf,
      reviewers: conRev.filter((cr) => cr.conferenceId === conf.id),
    };
  }).filter(conf => conf.reviewers.length > 0);

  return (
    <DashboardLayout>
      <WelcomeCard />
      <div className="bg-white p-6 rounded-lg mt-4">
        <div className="mt-6">
          <h3 className="text-lg font-medium">Reviewers</h3>
          <p className="text-sm text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="mt-2">
            <AddReviewer conferences={conference} users={user} />
          </div>

          {groupedByConference.length > 0 ? (
            groupedByConference.map((conf) => (
              <div key={conf.id} className="mt-6">
                <hr className="mt-2" />
                <h4 className="text-md font-medium mt-2">{conf.name}</h4>
                <table className="table-auto min-w-full bg-white mt-2">
                  <thead>
                    <tr className="text-sm">
                      <th className="py-2 text-start">Reviewer Name</th>
                      <th className="py-2 text-start w-60">Organizer Institution</th>
                      <th className="py-2 text-start">Organizer Email</th>
                      <th className="py-2 text-start">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {conf.reviewers.map((cr) => (
                      <tr className="text-gray-700 text-sm" key={cr.id}>
                        <td className="py-2">{cr.user.name}</td>
                        <td className="py-2">{cr.conference.institution}</td>
                        <td className="py-2">{cr.conference.User?.email}</td>
                        <td className="flex py-2">
                          <UpdateReviewer
                            conferences={conference}
                            users={user}
                            userId={cr.userId}
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
            <p className="text-gray-600">No reviewers available for any conference.</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reviewer;
