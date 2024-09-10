'use client';
import AddAuthors from "@/app/dashboard/mypapers/addAuthors";
import AddRevision from "@/app/dashboard/mypapers/addRevision";
import UpdateSubmission from "@/app/dashboard/mypapers/updateSubmission";
import { RegisterConference, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState } from "react";

type UserCon = {
  id: number,
  paper_title: string,
  topic: string,
  abstract: string,
  keywords: string,
  paper: string,
  institution: string,
  country: string,
  city: string,
  status: string,
  userId: number
  comments?: string | null;
  createdAt: Date,
  conferenceId: number
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
  Authors: {
    id: number,
    name: string,
    email: string,
    institution: string
  }[],
  Revisions: {
    id: number,
    paper_title: string,
    topic: string,
    abstract: string,
    keywords: string,
    paper: string,
  }[]
}

const TableMySubmission = ({ reg_conference }: { reg_conference: UserCon[] }) => {
  const [selectedComments, setSelectedComments] = useState<string | null>(null);
  const [selectedRevision, setSelectedRevision] = useState<UserCon["Revisions"] | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isRevisionOpen, setIsRevisionOpen] = useState(false);

  const handleModalOpen = (comments: string | null | undefined) => {
    setSelectedComments(comments ?? null); 
    setIsOpen(true);
  };

  const handleRevisionModalOpen = (revisions: UserCon["Revisions"]) => {
    if (Array.isArray(revisions) && revisions.length > 0) {
      console.log('Opening revisions modal with:', revisions);
      setSelectedRevision(revisions);
      setIsRevisionOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsOpen(false);
    setIsRevisionOpen(false);
  };

  const { data: session } = useSession();
  const user = session?.user as User;

  const filteredRegConferences = reg_conference.filter(reg => reg.userId === user?.id);

  console.log(reg_conference);

  return (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 mt-6">
                <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Conference Name
                    </th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Paper Title
                    </th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Authors
                    </th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Comments
                    </th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                    </th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {filteredRegConferences.map((reg_conference) => (
                    <tr key={reg_conference.id}>
                    <td className="px-3 py-2 whitespace-normal break-words">
                        <div className="text-xs font-medium text-gray-900">{reg_conference.conference.name}</div>
                    </td>
                    <td className="px-3 py-2 whitespace-normal break-words">
                        <div className="text-xs text-gray-900">{reg_conference.paper_title}</div>
                    </td>
                    <td className="px-3 py-2 whitespace-normal break-words">
                      <div className="text-xs text-gray-900">
                        <p className='font-bold'>{reg_conference.user.name}</p> ({reg_conference.user.email}, {reg_conference.institution})
                      </div>
                      <div className="text-xs text-gray-900 mt-2">
                        {reg_conference.Authors?.map((author, index) => (
                          <p key={author.id} className="mt-2">
                            <span className="font-bold">{author.name}</span> ({author.email}, {author.institution})
                            {index < reg_conference.Authors.length - 1 && ', '}
                          </p>
                        )) || <span>No additional authors</span>}
                      </div>
                    </td>
                    <td className="px-3 py-2 whitespace-normal break-words">
                        <button className="text-xs text-blue-950 underline hover:text-indigo-900" onClick={() => handleModalOpen(reg_conference.comments)}>
                        View comments
                        </button>
                    </td>
                    <td className="px-3 py-2 whitespace-normal text-nowrap">
                      <div className="block">
                        <a
                          className="text-xs text-blue-950 underline hover:text-indigo-900 block"
                          href={`/uploads/papers/${reg_conference.paper}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Paper
                        </a>

                        {reg_conference.status === 'Revision' && (
                          <div className="block">
                            <AddAuthors paperId={reg_conference.id} />
                          </div>
                        )}

                        {reg_conference.status === 'Submitted' && (
                          <div className="block">
                            <AddAuthors paperId={reg_conference.id} />
                          </div>
                        )}

                        {reg_conference.status !== 'Accepted' && reg_conference.status !== 'Rejected' && reg_conference.status !== 'Submitted' && (
                          <div className="block">
                            <AddRevision submissionId={reg_conference.id} />
                          </div>
                        )}

                        {reg_conference.status !== 'Submitted' && (
                          <button
                            className="text-xs text-blue-950 underline hover:text-indigo-900 block mt-2"
                            onClick={() => handleRevisionModalOpen(reg_conference.Revisions)}
                          >
                            Revisions History
                          </button>
                        )}
                      </div>
                    </td>

                    <td className="px-3 py-2 whitespace-normal text-nowrap">
                        {reg_conference.status === 'Accepted' && (
                          <UpdateSubmission registerConference={reg_conference}/>
                        )}
                        {reg_conference.status === 'Accepted' && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Accepted
                        </span>
                        )}
                        {reg_conference.status === 'Submitted' && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Submitted
                        </span>
                        )}
                        {reg_conference.status === 'Revision' && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            Need revision
                        </span>
                        )}
                        {reg_conference.status === 'Rejected' && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Rejected
                        </span>
                        )}
                    </td>
                  </tr>
                ))}
                </tbody>
            </table>

          {isOpen && (
            <div className="modal modal-open">
              <div className="modal-box bg-white">
                <h3 className="font-bold text-lg">Reviewer Comments</h3>
                <p className="py-4">
                  {selectedComments
                    ? selectedComments
                    : 'No comments available'}
                </p>
                <div className="modal-action">
                  <button type="button" className="btn text-white" onClick={handleModalClose}>Close</button>
                </div>
              </div>
            </div>
          )}

          {isRevisionOpen && selectedRevision && (
            <div className="modal modal-open">
              <div className="modal-box bg-white">
                <h3 className="font-bold text-lg">Revisions</h3>
                <ul className="py-4">
                  {selectedRevision.map((revision) => (
                    <li key={revision.id} className="my-2">
                      <strong>Paper Title:</strong> {revision.paper_title}<br/>
                      <strong>Topic:</strong> {revision.topic}<br/>
                      <strong>Abstract:</strong> {revision.abstract}<br/>
                      <strong>Keywords:</strong> {revision.keywords}<br/>
                      <a className="text-blue-950 underline" href={`/uploads/papers/${revision.paper}`} download>
                        Download Paper
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="modal-action">
                  <button type="button" className="btn text-white" onClick={handleModalClose}>Close</button>
                </div>
              </div>
            </div>
          )}
        </div>
  );
};

export default TableMySubmission;
