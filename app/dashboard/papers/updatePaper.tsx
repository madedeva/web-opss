"use client";
import { useState, SyntheticEvent } from "react";
import type { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AssignReviewer = ({ users, paperId }: { users: User[]; paperId: number; }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const filteredUsers = users
        .filter(user =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !selectedUserIds.includes(user.id)  // Exclude already selected users
        );

    const handleSelectUser = (userId: number) => {
        if (selectedUserIds.includes(userId)) {
            toast.info('Reviewer sudah dipilih!');
        } else {
            setSelectedUserIds([...selectedUserIds, userId]);
        }
    };

    const handleRemoveUser = (userId: number) => {
        setSelectedUserIds(selectedUserIds.filter(id => id !== userId));
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/assignreviewer', {
                userIds: selectedUserIds,
                registerConferenceId: paperId, 
            });

            const data = response.data;

            if (data.message.includes('No new reviewers to add')) {
                toast.warn('Some reviewers have been added.');
            } else {
                setSelectedUserIds([]);
                setSearchQuery('');
                toast.success(data.message);
                router.refresh();
                setIsOpen(false);
            }
        } catch (error: any) {
            console.error('Gagal menambah reviewer:', error);
            toast.error('Gagal menambah reviewer.');
        }
    };

    const handleModalToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button className="text-xs text-blue-950 hover:text-indigo-900 underline" onClick={handleModalToggle}>
                Asign Reviewer
            </button>

            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box bg-white w-full max-w-2xl text-gray-700">
                    <h3 className="font-bold text-lg text-center">Assign Reviewer</h3>
                    <hr className="mb-4"/>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control w-full mt-6">
                            <label className="mb-2 text-lg">Search Reviewers</label>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input input-bordered w-full mb-4 bg-white"
                                placeholder="Search reviewer..."
                            />
                            {searchQuery && (
                                <ul className="list-none p-0">
                                    {filteredUsers.length === 0 ? (
                                        <li className="p-2 text-gray-500 text-lg">No reviewers found</li>
                                    ) : (
                                        filteredUsers.map(user => (
                                            <li
                                                key={user.id}
                                                className="flex justify-between items-center p-2 border-b cursor-pointer hover:bg-gray-100 text-lg"
                                                onClick={() => handleSelectUser(user.id)}
                                            >
                                                {user.name}
                                            </li>
                                        ))
                                    )}
                                </ul>
                            )}
                            <hr />
                            <div className="mt-4">
                                <p className="mb-2 text-lg font-semibold">Selected Reviewers <span className="text-red-600">*</span></p>
                                <ul className="list-none p-0">
                                    {selectedUserIds.map(userId => {
                                        const user = users.find(u => u.id === userId);
                                        return user ? (
                                            <li key={userId} className="flex justify-between items-center mb-2 text-lg">
                                                {user.name}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveUser(userId)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    &times;
                                                </button>
                                            </li>
                                        ) : null;
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn text-white" onClick={handleModalToggle}>
                                Cancel
                            </button>
                            <button type="submit" className="btn bg-blue-950 text-white">
                                Assign Reviewers
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AssignReviewer;
