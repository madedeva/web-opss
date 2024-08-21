"use client";
import { useState, SyntheticEvent } from "react";
import type { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";

type UpdatePaperProps = {
    users: User[];
    paperId: number;
};

const UpdatePaper = ({ users, paperId }: UpdatePaperProps) => {
    const [idUser, setUser] = useState(paperId.toString());
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            await axios.post(`/api/assignreviewer`, {
                reviewerId: parseInt(idUser),
                registerConferenceId: paperId,
            });

            router.refresh();
            setIsOpen(false);
        } catch (error) {
            console.error("Error updating reviewer:", error);
        }
    };

    const handleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button className="text-xs text-blue-950 hover:text-indigo-900 underline" onClick={handleModal}>
                Asign Reviewer
            </button>

            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box bg-white">
                    <h3 className="font-bold text-lg">Asign Reviewer</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control w-full mt-6">
                            <p className="mb-2">Select Reviewer <span className="text-red-600">*</span></p>
                            <select 
                                value={idUser}
                                onChange={(e) => setUser(e.target.value)}
                                onClick={(e) => {
                                    const target = e.target as HTMLSelectElement;
                                    setUser(target.value);
                                }}
                                className="select select-bordered bg-white"
                                required
                            >
                                <option value="" disabled>Select Reviewer</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>{user.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn text-white" onClick={handleModal}>Cancel</button>
                            <button type="submit" className="btn bg-blue-950 text-white">Asign reviewer</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdatePaper;
