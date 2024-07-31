"use client";
import { useState, SyntheticEvent} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";
import { User, Conference } from "@prisma/client";

const RegisterConference = ({users, conferences}: {users: User[], conferences: Conference[]}) => {
    const { data: session } = useSession();
    const user = session?.user as User;
    const filteredConferences = conferences.filter(conferences => conferences.userId === user?.id);
    
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [idCon, setCon] = useState('');
    const [status, setStatus] = useState("Pending");

    const router = useRouter();

    type User = {
        id: number;
        name: string;
        email: string;
        roleId: number;
        conId: number;
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post('/api/myconference', {
            country,
            city,
            status,
            userId: user.id,
            conferenceId: parseInt(idCon),
        });

        setCountry('');
        setCity('');
        setStatus('Pending');
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
            <button className="bg-blue-600 text-white px-4 py-2 rounded-full" onClick={handleModal}>+ Register Conference</button>

            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box bg-white">
                    <h3 className="font-bold text-lg">Register New Conference</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control w-full">
                            <label className="label font-bold">Country</label>
                            <input 
                            type="text" 
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="input input-bordered bg-white" required/>
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">City</label>
                            <input 
                            type="text" 
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="input input-bordered bg-white" required/>
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Select Conference</label>
                            <select 
                            value={idCon}
                            onChange={(e) => setCon(e.target.value)}
                            className="select select-bordered bg-white" required>
                            <option value="" disabled>Select Conference</option>
                            {filteredConferences.map((conference) => (
                                <option key={conference.id} value={conference.id}>{conference.name}</option>
                            ))}
                            </select>
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Status</label>
                            <select 
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="select select-bordered bg-white" required>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn text-white" onClick={handleModal}>Close</button>
                            <button className="btn btn-primary text-white">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default RegisterConference;