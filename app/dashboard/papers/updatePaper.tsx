"use client";
import { useState, SyntheticEvent} from "react";
import type { Conference, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";

const updatePaper = ({users, userId, conRevId }: {users: User[], userId: number, conRevId: number}) => {

    const [idUser, setUser] = useState(userId.toString());

    const router = useRouter();

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.patch(`/api/myconference/${conRevId}`, {
            userId: parseInt(idUser)
        });

        setUser(idUser);
        router.refresh();
        setIsOpen(false);
    }

    const [isOpen, setIsOpen] = useState(false);

    const handleModal = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div>
            <button className="btn btn-ghost btn-sm text-blue-950 underline" onClick={handleModal}>
                Asign Reviewer
            </button>

            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box bg-white">
                    <h3 className="font-bold text-lg">Assign Reviewer</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control w-full">
                            <label className="label font-bold">Select Reviewer</label>
                            <select 
                            value={idUser}
                            onChange={(e) => setUser(e.target.value)}
                            className="select select-bordered bg-white" required>
                            <option value="" disabled>Select Reviewer</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            ))}
                            </select>
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn text-white" onClick={handleModal}>Close</button>
                            <button type="submit" className="btn btn-accent text-white">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default updatePaper