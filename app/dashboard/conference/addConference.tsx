"use client";
import { useState, SyntheticEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRef } from "react";

const AddConference = () => {
    const { data: session } = useSession();
    const [name, setName] = useState('');
    const [acronym, setAcronym] = useState('');
    const [theme, setTheme] = useState('');
    const [description, setDescription] = useState('');
    const [topic, setTopics] = useState<string[]>(['']);
    const [banner, setBanner] = useState<any>();
    const fileInput = useRef<HTMLInputElement>(null);
    const fileInput2 = useRef<HTMLInputElement>(null);
    const [venue, setVenue] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [email, setEmail] = useState('');
    const [institution, setInstitution] = useState('');
    const [paper_template, setPaperTemplate] = useState<any>();
    const [payment_info, setPaymentInfo] = useState('');
    const [submission_deadlineStart, setSubmissionDeadlineStart] = useState('');
    const [submission_deadlineEnd, setSubmissionDeadlineEnd] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('Inactive');
    const [countries, setCountries] = useState<string[]>([]);
    const [fetchError, setFetchError] = useState<string | null>(null);

    type User = {
        id: number;
        name: string;
        email: string;
        roleId: number;
    }

    const router = useRouter();

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

    const handleTopicChange = (index: number, value: string) => {
        const newTopics = [...topic];
        newTopics[index] = value;
        setTopics(newTopics);
    }

    const addTopicField = () => {
        setTopics([...topic, '']);
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('acronym', acronym);
        formData.append('theme', theme);
        formData.append('description', description);
        formData.append('topics', topic.join(', '));
        // formData.append('banner', banner);
        formData.append("banner", fileInput?.current?.files?.[0]!);
        formData.append('venue', venue);
        formData.append('address', address);
        formData.append('city', city);
        formData.append('country', country);
        formData.append('email', email);
        formData.append('institution', institution);
        // formData.append('paper_template', paper_template);
        formData.append("paper_template", fileInput2?.current?.files?.[0]!);
        formData.append('payment_info', payment_info);
        formData.append('submission_deadlineStart', new Date(submission_deadlineStart).toISOString());
        formData.append('submission_deadlineEnd', new Date(submission_deadlineEnd).toISOString());
        formData.append('startDate', new Date(startDate).toISOString());
        formData.append('endDate', new Date(endDate).toISOString());
        formData.append('status', status);

        const user = session?.user as User;
        formData.append('userId', user.id.toString());

        await axios.post('/api/conferences', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        setName('');
        setAcronym('');
        setTheme('');
        setDescription('');
        setTopics(['']);
        setBanner(null);
        setVenue('');
        setAddress('');
        setCity('');
        setCountry('');
        setEmail('');
        setInstitution('');
        setPaperTemplate(null);
        setPaymentInfo('');
        setSubmissionDeadlineStart('');
        setSubmissionDeadlineEnd('');
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
            <button className="bg-blue-950 text-white px-4 py-2 rounded-full" onClick={handleModal}>+ New Conference</button>

            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box bg-white w-full max-w-5xl">
                    <h3 className="font-bold text-lg text-center">Add New Conference</h3>
                    <hr className="mb-4"/>
                    <form onSubmit={handleSubmit} encType="multipart/data">
                        <div className="form-control w-full">
                            <label className="label font-bold">Conference Name <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="input input-bordered bg-white"
                                placeholder="Add conference name.."
                                required
                            />
                        </div>
                        <div className="form-control w-full mt-6">
                            <label className="label font-bold">Acronym <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                value={acronym}
                                onChange={(e) => setAcronym(e.target.value)}
                                className="input input-bordered bg-white"
                                placeholder="Add acronym here.."
                            />
                        </div>
                        <div className="form-control w-full mt-6">
                            <label className="label font-bold">Theme <span className="text-red-500">*</span></label>
                            <textarea 
                                value={theme}
                                onChange={(e) => setTheme(e.target.value)}
                                id="message" rows={12} className="block p-2.5 w-full text-sm rounded-lg border bg-white" placeholder="Write your theme here..."></textarea>
                        </div>
                        <div className="form-control w-full mt-6">
                            <label className="label font-bold">Description <span className="text-red-500">*</span></label>
                            <textarea 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                id="message" rows={12} className="block p-2.5 w-full text-sm rounded-lg border bg-white" placeholder="Write your description here..."></textarea>
                        </div>
                        <div className="w-full gap-4 mt-6">
                            {topic.map((topic, index) => (
                                <div className="form-control w-full mt-2" key={index}>
                                    <label className="label font-bold">Topic <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        value={topic}
                                        onChange={(e) => handleTopicChange(index, e.target.value)}
                                        className="input input-bordered bg-white"
                                        placeholder='Add topic here..'
                                        required
                                    />
                                </div>
                            ))}
                            <div className="mt-2">
                                <button type="button" className="btn btn-accent text-white mt-2" onClick={addTopicField}>Add new topic</button>
                            </div>
                        </div>
                        <div className="form-control w-full mt-6">
                            <label className="label font-bold">Banner Image<span className="text-red-500">*</span></label>
                            <input
                                type="file"
                                ref={fileInput}
                                value={banner}
                                onChange={(e) => setBanner(e.target.value)}
                                className="input input-bordered bg-white"
                                placeholder="Upload banner image.."
                            />
                        </div>
                        <div className="form-control w-full mt-6">
                            <label className="label font-bold">Conference Venue <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                value={venue}
                                onChange={(e) => setVenue(e.target.value)}
                                className="input input-bordered bg-white"
                                placeholder="Add conference venue.."
                            />
                        </div>
                        <div className="form-control w-full mt-6">
                            <label className="label font-bold">Address <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="input input-bordered bg-white"
                                placeholder="Add your conference address.."
                            />
                        </div>
                        <div className="form-control w-full mt-6">
                            <label className="label font-bold">City <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="input input-bordered bg-white"
                                placeholder="Add conference city.."
                            />
                        </div>
                        <div className="form-control w-full mt-6">
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
                        <div className="form-control w-full mt-6">
                            <label className="label font-bold">Organizer Email <span className="text-red-500">*</span></label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input input-bordered bg-white"
                                placeholder="Add organizer email.."
                            />
                        </div>
                        <div className="form-control w-full mt-6">
                            <label className="label font-bold">Organizer Institution <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                value={institution}
                                onChange={(e) => setInstitution(e.target.value)}
                                className="input input-bordered bg-white"
                                placeholder="Add organizer institution.."
                            />
                        </div>
                        <div className="form-control w-full mt-6">
                            <label className="label font-bold">Paper Template <span className="text-red-500">*</span></label>
                            <input
                                type="file"
                                ref={fileInput2}
                                value={paper_template}
                                onChange={(e) => setPaperTemplate(e.target.value)}
                                className="input input-bordered bg-white"
                                placeholder="Upload paper template.."
                            />
                        </div>
                        <div className="form-control w-full mt-6">
                            <label className="label font-bold">Payment Information <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                value={payment_info}
                                onChange={(e) => setPaymentInfo(e.target.value)}
                                className="input input-bordered bg-white"
                                placeholder="Write payment information.."
                            />
                        </div>
                        <div className="flex w-full gap-4 mt-6">
                            <div className="form-control w-1/2">
                                <label className="label font-bold">Submission Start Date<span className="text-red-500">*</span></label>
                                <input
                                    type="datetime-local"
                                    value={submission_deadlineStart}
                                    onChange={(e) => setSubmissionDeadlineStart(e.target.value)}
                                    className="input input-bordered bg-white"
                                    placeholder="Submission Deadline"
                                />
                            </div>
                            <div className="form-control w-1/2">
                                <label className="label font-bold">Submission End Date<span className="text-red-500">*</span></label>
                                <input
                                    type="datetime-local"
                                    value={submission_deadlineEnd}
                                    onChange={(e) => setSubmissionDeadlineEnd(e.target.value)}
                                    className="input input-bordered bg-white"
                                    placeholder="Submission Deadline"
                                />
                            </div>
                        </div>
                        <div className="flex w-full gap-4 mt-6">
                            <div className="form-control w-1/2">
                                <label className="label font-bold">
                                    Conference Start Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="datetime-local"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="input input-bordered bg-white"
                                    placeholder="Start Date"
                                />
                            </div>
                            <div className="form-control w-1/2">
                                <label className="label font-bold">
                                Conference End Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="datetime-local"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="input input-bordered bg-white"
                                    placeholder="End Date"
                                />
                            </div>
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn text-white" onClick={handleModal}>Cancel</button>
                            <button type="submit" className="btn btn-accent text-white">Add Conference</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddConference;
