'use client'
import DeleteConRev from "@/app/dashboard/reviewers/deleteReviewer";
import UpdateReviewer from "@/app/dashboard/reviewers/updateReviewer";
import { Conference, PrismaClient, User, Con_Reviewer } from "@prisma/client";
import { useSession } from "next-auth/react";

const TableReviewer = ({conRev}:{ conRev:  Con_Reviewer[]}) => {
    
        const { data: session } = useSession();
    
        const user = session?.user as User & { conferenceId: number };
    
        // const filteredConRev = conRev.filter(conRev => conRev.conferenceId === user?.id);

        const filteredConRev = conRev.filter(conRev => 
            conRev.conferenceId === user?.conferenceId
          );
          
    
        return (
            <table className="table-auto min-w-full bg-white mt-6 text-left">
            <thead>
            <tr>
                <th className="py-2">Reviewer Name</th>
                <th className="py-2">Email</th>
                <th className="py-2 w-60">Conference Name</th>
                <th className="py-2">Action</th>
            </tr>
            </thead>
            <tbody>
            {filteredConRev.map((conRev) => (
            <tr className="text-gray-700" key={conRev.id}>
                <td className="py-2">{conRev.userId}</td>
                <td className="py-2">{conRev.userId}</td>
                <td className="py-2">{conRev.conferenceId}</td>
                <td className="py-2">
                    <DeleteConRev conRev={conRev}/>
                    {/* <UpdateReviewer conferences={conRev.conference} users={[user]} userId={conRev.userId} conId={conRev.conferenceId} conRevId={conRev.id} /> */}
                </td>
            </tr>
            ))}
            </tbody>
        </table>
    )
}

export default TableReviewer