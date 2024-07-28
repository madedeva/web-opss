"use client";
import { useState, SyntheticEvent} from "react";
import type { Conference, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";

const AddReviewer = ({users, conferences}: {users: User[], conferences: Conference[]}) => {
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

    return (
        <div>
            {/* <button className="btn btn-accent text-white" onClick={handleModal}>
            <svg width="32px" height="32px" viewBox="-3.6 -3.6 31.20 31.20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 12H18M12 6V18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                Add New
            </button> */}
            <button className="bg-blue-600 text-white px-4 py-2 rounded-full" onClick={handleModal}>+ New Review</button>

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
                            <option value="" disabled>Select Brand</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            ))}
                            </select>
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Conference</label>
                            <select 
                            value={idCon}
                            onChange={(e) => setCon(e.target.value)}
                            className="select select-bordered bg-white" required>
                            <option value="" disabled>Select Brand</option>
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