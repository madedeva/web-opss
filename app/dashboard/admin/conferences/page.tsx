import TableConference from "@/app/components/Conference/TableConference";
import DashboardLayout from "@/app/components/DashboardLayout"
import WelcomeCard from "@/app/components/WelcomeCard";
import { PrismaClient } from "@prisma/client";

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
          _count: true
      },
    });
    return res;
};

const RegisteredConferences = async () => {

  const [conference] = await Promise.all([getConference()]);

    return (
    <DashboardLayout>
        <WelcomeCard />

        <div className="bg-white p-6 rounded-lg mt-4">
        <div className="mt-6">
          <h3 className="text-lg font-medium">Registered Conferences</h3>
          <p className="text-sm text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <hr className="mt-2"/>
          <TableConference conference={conference}/>
        </div>
      </div>
    </DashboardLayout>
    )
};

export default RegisteredConferences;