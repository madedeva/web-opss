"use client";
import { useState, SyntheticEvent, useEffect} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Conference } from "@prisma/client";

const RegisterConference = ({conferences}: {conferences: Conference[]}) => {
    const { data: session } = useSession();
    const user = session?.user as User;

    const filterConferences = conferences.filter(conference => 
        conference.status === "Active"
    );

    const [selectedConferenceId, setSelectedConferenceId] = useState('');
    const [institution, setInstitution] = useState ("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [status, setStatus] = useState("Pending");
    const [countries, setCountries] = useState<string[]>([]);
    const [fetchError, setFetchError] = useState<string | null>(null);

    const router = useRouter();

    type User = {
        id: number;
        name: string;
        email: string;
        roleId: number;
    }

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('/countries.json');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setCountries(data);
            } catch (error) {
                console.error('Error fetching countries:', error);
                setFetchError('Failed to load countries');
            }
        };

        fetchCountries();
    }, []);

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post('/api/myconference', {
            institution,
            country,
            city,
            status,
            userId: user.id,
            conferenceId: parseInt(selectedConferenceId),
        });

        setInstitution('');
        setCountry('');
        setCity('');
        setStatus('Pending');
        setSelectedConferenceId('');
        
        router.refresh();
        setIsOpen(false);
    
    }

    const [isOpen, setIsOpen] = useState(false);

    const handleModal = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div>
            <button className="bg-blue-950 text-white px-4 py-2 rounded-full" onClick={handleModal}>+ Register Conference</button>

            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box bg-white w-full max-w-5xl">
                    <h3 className="font-bold text-lg">Register New Conference</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control w-full">
                            <label className="label font-bold">Institution <span className="text-red-500">*</span></label>
                            <input 
                            type="text" 
                            value={institution}
                            onChange={(e) => setInstitution(e.target.value)}
                            className="input input-bordered bg-white" required/>
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Country <span className="text-red-500">*</span></label>
                            <select
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="select select-bordered bg-white"
                                required
                            >
                                <option value="" disabled>Select Country</option>
                                {countries.map((country) => (
                                    <option key={country} value={country}>
                                        {country}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">City <span className="text-red-500">*</span></label>
                            <input 
                            type="text" 
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="input input-bordered bg-white" required/>
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Select Conference <span className="text-red-500">*</span></label>
                            <select
                                value={selectedConferenceId}
                                onChange={(e) => setSelectedConferenceId(e.target.value)}
                                className="select select-bordered bg-white"
                                required
                            >
                            <option value="" disabled>Select Conference</option>
                            {filterConferences.length === 0 ? (
                                    <option disabled>No active conferences available</option>
                                ) : (
                                    filterConferences.map(conference => (
                                        <option key={conference.id} value={conference.id}>
                                            {conference.name}
                                        </option>
                                    ))
                            )}
                            </select>
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Status <span className="text-red-500">*</span></label>
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
                            <button type="button" className="btn text-white" onClick={handleModal}>Cancel</button>
                            <button className="btn btn-primary text-white">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default RegisterConference;