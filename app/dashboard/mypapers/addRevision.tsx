"use client";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type AddRevisionProps = {
    submissionId: number;
};

const AddRevision = ({ submissionId }: AddRevisionProps) => {
    const [paperTitle, setPaperTitle] = useState("");
    const [abstract, setAbstract] = useState("");
    const [keywords, setKeywords] = useState("");
    const [topic, setTopic] = useState("");
    const [paper, setPaper] = useState<File | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        if (!paper) {
            toast.error('Please upload the paper file.');
            return;
        }

        const formData = new FormData();
        formData.append('paper_title', paperTitle);
        formData.append('abstract', abstract);
        formData.append('keywords', keywords);
        formData.append('topic', topic);
        formData.append('paper', paper);
        formData.append('submissionId', submissionId.toString());

        try {
            await axios.post(`/api/uploadrevision`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success('Revision added successfully!');
            setPaperTitle("");
            setAbstract("");
            setKeywords("");
            setTopic("");
            setPaper(null);

            router.refresh();
            setIsOpen(false);
        } catch (error) {
            console.error("Error adding revision:", error);
            toast.error('Failed to add revision: ' + error);
        }
    };

    const handleModal = () => {
        setIsOpen(!isOpen);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setPaper(e.target.files[0]);
        }
    };

    return (
        <div>
            <button className="text-xs text-blue-950 hover:text-indigo-900 underline mt-2" onClick={handleModal}>
                + Submit New Revision
            </button>

            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box bg-white">
                    <h3 className="font-bold text-lg">Add Revision</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control w-full mt-6">
                            <label className="mb-2">Paper Title <span className="text-red-600">*</span></label>
                            <input 
                                type="text"
                                value={paperTitle}
                                onChange={(e) => setPaperTitle(e.target.value)}
                                className="input input-bordered bg-white"
                                required
                            />
                        </div>
                        <div className="form-control w-full mt-4">
                            <label className="mb-2">Abstract <span className="text-red-600">*</span></label>
                            <textarea
                                value={abstract}
                                onChange={(e) => setAbstract(e.target.value)}
                                className="textarea textarea-bordered bg-white"
                                required
                            />
                        </div>
                        <div className="form-control w-full mt-4">
                            <label className="mb-2">Keywords <span className="text-red-600">*</span></label>
                            <input 
                                type="text"
                                value={keywords}
                                onChange={(e) => setKeywords(e.target.value)}
                                className="input input-bordered bg-white"
                                required
                            />
                        </div>
                        <div className="form-control w-full mt-4">
                            <label className="mb-2">Topic <span className="text-red-600">*</span></label>
                            <input 
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                className="input input-bordered bg-white"
                                required
                            />
                        </div>
                        <div className="form-control w-full mt-4">
                            <label className="mb-2">Upload Paper <span className="text-red-600">*</span></label>
                            <input 
                                type="file"
                                onChange={handleFileChange}
                                className="file-input file-input-bordered w-full bg-white"
                                required
                            />
                        </div>
                        <div className="modal-action mt-6">
                            <button type="button" className="btn text-white" onClick={handleModal}>Cancel</button>
                            <button type="submit" className="btn bg-blue-950 text-white">Submit Revision</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddRevision;
