"use client";
import { useState, SyntheticEvent} from "react";
import type { Conference, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";

const AddReviewer = ({users, conferences, loggedInUserId}: {users: User[], conferences: Conference[], loggedInUserId: number}) => {
    const [idUser, setUser] = useState('');
    const [idCon, setCon] = useState('');

    const router = useRouter();

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.post('/api/review', {
            userId: parseInt(idUser),
            conferenceId: parseInt(idCon),
        });
        setUser('');
        setCon('');
        router.refresh();
        setIsOpen(false);
    }

    const [isOpen, setIsOpen] = useState(false);

    const handleModal = () => {
        setIsOpen(!isOpen);
    }

    // const usersFiltered = users.filter(user => user.id !== loggedInUserId);

    return (
        <div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-full" onClick={handleModal}>+ New Reviewer</button>

            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box bg-white">
                    <h3 className="font-bold text-lg">Add New Reviewer</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control w-full">
                            <label className="label font-bold">Reviewer</label>
                            <select 
                            value={idUser}
                            onChange={(e) => setUser(e.target.value)}
                            className="select select-bordered bg-white" required>
                            <option value="" disabled>Select Reviewer</option>
                            {users.map(user => (
                                    <option key={user.id} value={user.id}>{user.name}</option>
                            ))}
                            {/* {users.filter(user => user.roleId === 3).map(user => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            ))} */}
                            </select>
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Select Conference</label>
                            <select 
                            value={idCon}
                            onChange={(e) => setCon(e.target.value)}
                            className="select select-bordered bg-white" required>
                            <option value="" disabled>Select Conference</option>
                            {conferences.map((conference) => (
                                <option key={conference.id} value={conference.id}>{conference.name}</option>
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

export default AddReviewer;