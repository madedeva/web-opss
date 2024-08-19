'use client'
import DashboardLayout from "@/app/components/DashboardLayout";
import { useEffect, useState } from "react";

const Profile = () => {
    const [countries, setCountries] = useState<string[]>([]);
    const [fetchError, setFetchError] = useState<string | null>(null);

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


  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded-lg">
        <div className="mt-6 text-gray-700">
          <h3 className="text-lg font-bold">Create new submission</h3>
          <p className="text-sm text-gray-600">
          Ready to share your work? Create a new submission and showcase your research at the upcoming conference.
          </p>
          <hr className="mt-2 mb-6" />
          <form>
            <div className="form-control w-full mt-6">
                <p className="mb-2">Conference Name<span className="text-red-600">*</span></p>
                <input className="block w-full p-2 border bg-white rounded" 
                type="text"
                />
            </div>
            <div className="form-control w-full mt-6">
                <p className="mb-2">Paper Title <span className="text-red-600">*</span></p>
                <input className="block w-full p-2 border bg-white rounded" 
                type="text"
                />
            </div>
            <div className="form-control w-full mt-6">
                <p className="mb-2">Topic or Track <span className="text-red-600">*</span></p>
                <select
                    value=""
                    className="select select-bordered bg-white"
                    required
                    >
                    {/* {topicOptions.map((topic, index) => ( */}
                    <option ></option>
                    {/* ))} */}
                </select>
            </div>
            <div className="form-control w-full mt-6">
                <p className="mb-2">Abstract <span className="text-red-600">*</span></p>
                <textarea 
                    value=""
                    id="message" rows={12} className="block p-2.5 w-full text-sm rounded-lg border bg-white" placeholder="Write abstract here.." required></textarea>
            </div>
            <div className="form-control w-full mt-6">
                <p className="mb-2">Keywords <span className="text-red-600">*</span></p>
                <input 
                type="text" 
                value=""
                className="input input-bordered bg-white" required/>
            </div>
            <div className="w-full mt-6">
                <p>Full Paper <span className="text-red-600">*</span></p>
                <p className="text-xs mb-2">only .pdf allowed</p>
                <label
                className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none mt-2">
                <span className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="font-medium text-gray-600">
                        Drop files to Attach, or
                        <span className="text-blue-950 ml-1 underline">browse</span>
                    </span>
                </span>
                <input 
                    type="file"
                    value=""
                    name="file_upload"
                    className="hidden" 
                    />
                </label>
            </div>
            <div className="form-control w-full mt-6">
                <p className="mb-2">Institution <span className="text-red-600">*</span></p>
                <input 
                type="text" 
                value=""
                className="input input-bordered bg-white" required/>
            </div>
            <div className="form-control w-full mt-6">
                <p className="mb-2">Country <span className="text-red-600">*</span></p>
                <select
                value=""
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
                <p className="mb-2">City <span className="text-red-600">*</span></p>
                <input 
                type="text" 
                value=""
                className="input input-bordered bg-white" required/>
            </div>
            <div className="form-control w-full mt-6">
                <p className="mb-2">Status <span className="text-red-600">*</span></p>
                <select 
                value=""
                className="select select-bordered bg-white" required>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Accepted</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </div>
            <div className="mt-6 text-right">
                <button className="px-4 py-2 bg-blue-950 text-white rounded-md shadow-sm">
                    Submit Paper
                </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
