'use client'
import DeleteConference from "@/app/dashboard/conference/deleteConference";
import UpdateConference from "@/app/dashboard/conference/updateConference";
import { RegisterConference, User } from "@prisma/client";
import { useSession } from "next-auth/react";

type UserCon = {
  country: string,
  userId: number,
  id: number,
  user: {
      name: string,
      email: string,
  },
  conference: {
    id: number,
    name: string,
      User: {
          name: string,
          email: string,
      };
  }
}

const TableMyConference = ({ reg_conference }: { reg_conference: UserCon[] }) => {
    const { data: session } = useSession();
    const user = session?.user as User;

    const filteredRegConferences = reg_conference.filter(reg => reg.userId === user?.id);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white mt-6 text-left">
        <thead>
          <tr className="text-sm">
            <th className="py-2 w-60">Conference Name</th>
            <th className="py-2">Conference Date</th>
            <th className="py-2">Submission Deadline</th>
            <th className="py-2 w-60">Actions</th>
          </tr>
        </thead>
        <tbody>
        {filteredRegConferences.map((reg_conference) => (
            <tr className="text-gray-700 text-sm text-left" key={reg_conference.id}>
              <td className="py-2">{reg_conference.conference.name}</td>
              <td className="py-2">{reg_conference.user.name}</td>
              <td className="py-2">{reg_conference.country}</td>
              <td className="py-2">
                {/* <UpdateConference reg_con={reg_con} />
                <DeleteConference reg_con={reg_con} /> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
    );
};

export default TableMyConference;
