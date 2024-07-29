"use client";
import { useState, SyntheticEvent} from "react";
import type { Brand } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";

type User = {
    id: number;
    name: string;
}

type Conference = {
    id: number;
    name: string;
    slug: string;
    acronym: string | null;
    theme: string | null;
    description: string | null;
    topic: string | null;
    banner: string | null;
    venue: string | null;
    address: string | null;
    city: string | null;
    country: string | null;
    email: string | null;
    institution: string | null;
    paper_template: string | null;
    payment_info: string | null;
    submission_deadline: Date;
    startDate: Date;
    endDate: Date;
    status: string;
    userId: number;
}

const UpdateConference = ({conference}: {conference: Conference}) => {
    const [name, setName] = useState(conference.name);
    const [slug, setSlug] = useState(conference.slug);
    const [acronym, setAcronym] = useState(conference.acronym || '');
    const [theme, setTheme] = useState(conference.theme || '');
    const [description, setDescription] = useState(conference.description || '');
    const [topic, setTopic] = useState(conference.topic || '');
    const [banner, setBanner] = useState(conference.banner || '');
    const [venue, setVenue] = useState(conference.venue || '');
    const [address, setAddress] = useState(conference.address || '');
    const [city, setCity] = useState(conference.city || '');
    const [country, setCountry] = useState(conference.country || '');
    const [email, setEmail] = useState(conference.email || '');
    const [institution, setInstitution] = useState(conference.institution || '');
    const [paper_template, setPaperTemplate] = useState(conference.paper_template || '');
    const [payment_info, setPaymentInfo] = useState(conference.payment_info || '');
    const [submission_deadline, setSubmissionDeadline] = useState(conference.submission_deadline);
    const [startDate, setStartDate] = useState(conference.startDate);
    const [endDate, setEndDate] = useState(conference.endDate);
    const [status, setStatus] = useState(conference.status);

    const router = useRouter();

    const handleUpdate = async (e: SyntheticEvent) => {

        // ISO-8601 DateTime
        const submissionDeadlineIso = new Date(submission_deadline).toISOString();
        const startDateIso = new Date(startDate).toISOString();
        const endDateIso = new Date(endDate).toISOString();

        e.preventDefault();
        await axios.patch(`/api/conferences/${conference.id}`, {
            name: name,
            acronym: acronym,
            theme: theme,
            description: description,
            topic: topic,
            banner: banner,
            venue: venue,
            address: address,
            city: city,
            country: country,
            email: email,
            institution: institution,
            paper_template: paper_template,
            payment_info: payment_info,
            submission_deadline: submissionDeadlineIso,
            startDate: startDateIso,
            endDate: endDateIso,
            status: status,
        });
        router.refresh();
        setIsOpen(false);
    }

    const [isOpen, setIsOpen] = useState(false);

    const handleModal = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div>
            <button className="btn btn-ghost btn-sm text-white" onClick={handleModal}>
            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#00aaff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#00aaff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#00aaff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            </button>

            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box bg-white">
                    <h3 className="font-bold text-lg">Update {conference.name}</h3>
                    <form onSubmit={handleUpdate}>
                    <div className="form-control w-full">
                            <label className="label font-bold">Name</label>
                            <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input input-bordered bg-white"
                            placeholder="Name"
                            required
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Acronym</label>
                            <input
                            type="text"
                            value={acronym}
                            onChange={(e) => setAcronym(e.target.value)}
                            className="input input-bordered bg-white"
                            placeholder="Acronym"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Theme</label>
                            <input
                            type="text"
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                            className="input input-bordered bg-white"
                            placeholder="Theme"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Description</label>
                            <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="input input-bordered bg-white"
                            placeholder="Description"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Topic</label>
                            <input
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="input input-bordered bg-white"
                            placeholder="Topic"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Banner</label>
                            <input
                            type="text"
                            value={banner}
                            onChange={(e) => setBanner(e.target.value)}
                            className="input input-bordered bg-white"
                            placeholder="Banner"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Venue</label>
                            <input
                            type="text"
                            value={venue}
                            onChange={(e) => setVenue(e.target.value)}
                            className="input input-bordered bg-white"
                            placeholder="Venue"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Address</label>
                            <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="input input-bordered bg-white"
                            placeholder="Address"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">City</label>
                            <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="input input-bordered bg-white"
                            placeholder="City"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Country</label>
                            <input
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="input input-bordered bg-white"
                            placeholder="Country"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Email</label>
                            <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input input-bordered bg-white"
                            placeholder="Email"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Institution</label>
                            <input
                            type="text"
                            value={institution}
                            onChange={(e) => setInstitution(e.target.value)}
                            className="input input-bordered bg-white"
                            placeholder="Institution"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Paper Template</label>
                            <input
                            type="text"
                            value={paper_template}
                            onChange={(e) => setPaperTemplate(e.target.value)}
                            className="input input-bordered bg-white"
                            placeholder="Paper Template"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Payment Info</label>
                            <input
                            type="text"
                            value={payment_info}
                            onChange={(e) => setPaymentInfo(e.target.value)}
                            className="input input-bordered bg-white"
                            placeholder="Payment Info"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Submission Deadline</label>
                            <input
                            type="datetime-local"
                            value={submission_deadline.toString()}
                            onChange={(e) => setSubmissionDeadline(new Date(e.target.value))}
                            className="input input-bordered bg-white"
                            placeholder="Submission Deadline"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Start Date</label>
                            <input
                            type="datetime-local"
                            value={startDate.toString()}
                            onChange={(e) => setStartDate(new Date(e.target.value))}
                            className="input input-bordered bg-white"
                            placeholder="Start Date"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">End Date</label>
                            <input
                            type="datetime-local"
                            value={endDate.toString()}
                            onChange={(e) => setEndDate(new Date(e.target.value))}
                            className="input input-bordered bg-white"
                            placeholder="End Date"
                            />
                        </div>
                        {/* <div className="form-control w-full">
                            <label className="label font-bold">Status</label>
                            <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="select select-bordered bg-white"
                            required>
                                <option value="" disabled>Select Status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div> */}
                        <div className="form-control w-full invisible">
                            <label className="label font-bold">Status</label>
                            <input
                                type="text"
                                value={status}
                                readOnly
                                className="input input-bordered bg-white"
                            />
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn text-white" onClick={handleModal}>Close</button>
                            <button type="submit" className="btn btn-accent text-white">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateConference;