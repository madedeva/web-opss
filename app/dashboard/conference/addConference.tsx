"use client";
import { useState, SyntheticEvent} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";

const AddConference = () => {
    const { data: session } = useSession();
    const [name, setName] = useState('');
    const [acronym, setAcronym] = useState('');
    const [theme, setTheme] = useState('');
    const [description, setDescription] = useState('');
    const [topic, setTopic] = useState('');
    const [banner, setBanner] = useState('');
    const [venue, setVenue] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [email, setEmail] = useState('');
    const [institution, setInstitution] = useState('');
    const [paper_template, setPaperTemplate] = useState('');
    const [payment_info, setPaymentInfo] = useState('');
    const [submissionDeadline, setSubmissionDeadline] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('Inactive');

    type User = {
        id: number;
        name: string;
        email: string;
        roleId: number;
    }


    const router = useRouter();

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        // ISO-8601 DateTime
        const submissionDeadlineIso = new Date(submissionDeadline).toISOString();
        const startDateIso = new Date(startDate).toISOString();
        const endDateIso = new Date(endDate).toISOString();

        const user = session?.user as User;

        await axios.post('/api/conferences', {
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
            userId: user.id
        });
        setName('');
        setAcronym('');
        setTheme('');
        setDescription('');
        setTopic('');
        setBanner('');
        setVenue('');
        setAddress('');
        setCity('');
        setCountry('');
        setEmail('');
        setInstitution('');
        setPaperTemplate('');
        setPaymentInfo('');
        setSubmissionDeadline('');
        setStartDate('');
        setEndDate('');
        setStatus('Inactive');

        router.refresh();
        setIsOpen(false);
    }

    const [isOpen, setIsOpen] = useState(false);

    const handleModal = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div>

            <button className="bg-blue-600 text-white px-4 py-2 rounded-full" onClick={handleModal}>+ New Conference</button>

            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box bg-white">
                    <h3 className="font-bold text-lg">Add New Conference</h3>
                    <form onSubmit={handleSubmit}>
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
                            <textarea 
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                            id="message" rows={12} className="block p-2.5 w-full text-sm rounded-lg border bg-white" placeholder="Write your thoughts here..."></textarea>
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Description</label>
                            <textarea 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            id="message" rows={12} className="block p-2.5 w-full text-sm rounded-lg border bg-white" placeholder="Write your thoughts here..."></textarea>
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
                            value={submissionDeadline}
                            onChange={(e) => setSubmissionDeadline(e.target.value)}
                            className="input input-bordered bg-white"
                            placeholder="Submission Deadline"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Start Date</label>
                            <input
                            type="datetime-local"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="input input-bordered bg-white"
                            placeholder="Start Date"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">End Date</label>
                            <input
                            type="datetime-local"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
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
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="draft">Draft</option>
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
                            <button type="submit" className="btn btn-accent text-white">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddConference;