import DashboardLayout from "@/app/components/DashboardLayout"
import WelcomeCard from "@/app/components/WelcomeCard";
import RegisterConference from "./RegisterConference";
import { PrismaClient } from "@prisma/client";
import TableMyConference from "@/app/components/MyConference/TableMyConference";


const prisma = new PrismaClient();

const getRegisterConference = async () => {
  try {
    const res = await prisma.registerConference.findMany({
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
              select:{
                name: true,
                email:true,
              }
            }
          }
        },
      },
    });
    return res;
  } catch (error) {
    console.error("Error fetching registered conferences:", error);
    return [];
  }
};


const getConference = async () => {
  const res = await prisma.conference.findMany();
  return res;
}

const MyConferences = async () => {

  const [reg_conference, conference] = await Promise.all([getRegisterConference(), getConference()]);

    return (
    <DashboardLayout>
        <WelcomeCard />

        <div className="bg-white p-6 rounded-lg mt-4">
        <div className="mt-6">
          <h3 className="text-lg font-medium">My Conferences</h3>
          <p className="text-sm text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="mt-2">
          <RegisterConference conferences={conference}/>
          </div>
          <hr className="mt-2"/>
          <TableMyConference reg_conference={reg_conference} />
        </div>
      </div>
    </DashboardLayout>
    )
};

export default MyConferences