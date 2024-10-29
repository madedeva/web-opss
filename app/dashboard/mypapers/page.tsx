import DashboardLayout from "@/app/components/DashboardLayout"
import { PrismaClient } from "@prisma/client";
import TableMySubmission from "@/app/components/Submission/TableMySubmission";

const prisma = new PrismaClient();

type UserCon = {
  country: string,
  userId: number,
  id: number,
  status: string,
  paper_title: string,
  comments?: string | null;
  createdAt: Date,
  paper: string
  user: {
      name: string,
      email: string,
  },
  conference: {
    id: number,
    name: string,
    description: string,
    submission_deadlineStart: Date,
    submission_deadlineEnd: Date,
    paper_template: string,
    acronym: string
    User: {
        name: string,
        email: string,
    };
  },
  Revision: {
    id: number,
    paper_title: string,
    topic: string,
    abstract: string,
    keywords: string,
    paper: string,
    createdAt: Date,
  }[]
}

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
        Authors: {
          select: {
            id: true,
            email: true,
            name: true,
            institution: true,
          }
        },
        Revision: true
      },
    });

    const reg_conference = res.map((item) => ({
      ...item,
      Revisions: item.Revision,
    }));

    return res;
  } catch (error) {
    console.error("Error fetching registered conferences:", error);
    return [];
  }
};

const MyConferences = async () => {
  
    const [reg_conference] = await Promise.all([getRegisterConference()]);

    return (
    <DashboardLayout>
        <div className="bg-white p-6 rounded-lg">
        <div className="mt-6">
          <h3 className="text-lg font-medium">My Papers</h3>
          <p className="text-sm text-gray-600">
          Below is a list of the history of the papers you have submitted.
          </p>
          <TableMySubmission reg_conference={reg_conference} />
        </div>
      </div>
    </DashboardLayout>
    )
};

export default MyConferences