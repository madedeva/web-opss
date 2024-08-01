'use client'
import DeleteConference from "@/app/dashboard/conference/deleteConference";
import UpdateConference from "@/app/dashboard/conference/updateConference";
import { RegisterConference, User } from "@prisma/client";
import { useSession } from "next-auth/react";

const TableMyConference = ({ reg_conference }: { reg_conference: RegisterConference[] }) => {
    const { data: session } = useSession();
    const user = session?.user as User;

    const filteredRegConferences = reg_conference.filter(reg => reg.userId === user?.id);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white mt-6 text-left">
        <thead>
          <tr className="text-sm">
            <th className="py-2 w-60">Conference Name</th>
            <th className="py-2 w-60">User ID</th>
            <th className="py-2 w-60">Country</th>
            <th className="py-2 w-60">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRegConferences.map((reg_con, index) => (
            <tr className="text-gray-700 text-sm text-left" key={reg_con.id}>
              <td className="py-2">{reg_con.conferenceId}</td>
              <td className="py-2">{reg_con.userId}</td>
              <td className="py-2">{reg_con.country}</td>
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
