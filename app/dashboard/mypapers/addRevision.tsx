"use client";
import { useState, SyntheticEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'align': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['link'],
        ['clean']
    ],
};

type AddRevisionProps = {
    registerConferenceId: number;
};

const AddRevision = ({ registerConferenceId }: AddRevisionProps) => {
    const [paperTitle, setPaperTitle] = useState("");
    const [abstract, setAbstract] = useState("");
    const [keywordsInput, setKeywordsInput] = useState("");
    const [keywords, setKeywords] = useState<string[]>([]);
    const [topics, setTopics] = useState<string[]>([]);
    const [topic, setTopic] = useState("");
    const [paper, setPaper] = useState<File | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleAddKeyword = () => {
        if (keywordsInput.trim() !== "" && !keywords.includes(keywordsInput)) {
            setKeywords([...keywords, keywordsInput]);
            setKeywordsInput("");
        }
    };

    const handleRemoveKeyword = (keywordToRemove: string) => {
        setKeywords(keywords.filter(keyword => keyword !== keywordToRemove));
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        if (!paper) {
            toast.error('Please upload the paper file.');
            return;
        }

        const formData = new FormData();
        formData.append('paper_title', paperTitle);
        formData.append('abstract', abstract);
        formData.append('keywords', keywords.join(", "));
        formData.append('topic', topic);
        formData.append('paper', paper);
        formData.append('submissionId', registerConferenceId.toString());

        try {
            await axios.post(`/api/uploadrevision`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success('Revision added successfully!');
            setPaperTitle("");
            setAbstract("");
            setKeywords([]);
            setTopic("");
            setPaper(null);

            router.refresh();
            setIsOpen(false);
        } catch (error) {
            console.error("Error adding revision:", error);
            toast.error('Failed to add revision: ' + error);
        }
    };

    useEffect(() => {
        const fetchTopics = async () => {
          try {
            const response = await axios.get(`/api/conference?registerConferenceId=${registerConferenceId}`);
            setTopics(response.data.topics);
          } catch (error) {
            console.error("Error fetching topics:", error);
          }
        };
    
        if (registerConferenceId) {
          fetchTopics();
        }
      }, [registerConferenceId]);

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
                <div className="modal-box bg-white max-w-4xl text-gray-700">
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
                            <ReactQuill 
                                theme="snow" 
                                className="mb-12"
                                value={abstract} 
                                onChange={setAbstract}
                                style={{ height: '400px' }}
                                modules={modules}
                            />
                        </div>

                        <div className="form-control w-full mt-4">
                            <label className="mb-2">Keywords <span className="text-red-600">*</span></label>
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    value={keywordsInput}
                                    onChange={(e) => setKeywordsInput(e.target.value)}
                                    className="input input-bordered bg-white w-3/4"
                                    placeholder="Add a keyword"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddKeyword}
                                    className="btn bg-blue-950 btn-outline text-white ml-2"
                                >
                                    Add
                                </button>
                            </div>
                            <ul className="list-disc mt-2 pl-5">
                                {keywords.map((keyword, index) => (
                                    <li key={index} className="flex items-center mb-1">
                                        <span className="flex-1">{keyword}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveKeyword(keyword)}
                                            className="btn btn-xs btn-error text-white px-1 py-0.5 text-xs ml-2"
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="form-control w-full mt-4">
                            <label className="mb-2">Topic <span className="text-red-600">*</span></label>
                            <select
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                className="select select-bordered bg-white"
                                required
                            >
                                <option value="">Select a topic</option>
                                {topics.map((topic, index) => (
                                    <option key={index} value={topic}>{topic}</option>
                                ))}
                            </select>
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
