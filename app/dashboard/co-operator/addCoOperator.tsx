'use client'
import { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

type Conference = {
  id: number;
  name: string;
  userId: number
};

type UserConferenceProps = {
  userId: number;
}

const AddCoOperator: React.FC<UserConferenceProps> = ({ userId }) => {
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [selectedConference, setSelectedConference] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    roleId: '6',
    conferenceId: '',
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    const fetchConferences = async () => {
      try {
        const response = await axios.get(`/api/conferences/${userId}`);
        setConferences(response.data);
      } catch (error) {
        console.error('Failed to fetch conferences', error);
        toast.error('Error fetching conferences.');
      }
    };
    fetchConferences();
  }, [userId]);

  const generatePassword = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
  };

  const generateEmail = (name: string) => {
    const randomString = Math.random().toString(36).substring(2, 8);
    const nameParts = name.toLowerCase().trim().split(' ');
    const emailName = nameParts.length > 1 ? nameParts[0] + '.' + nameParts[1] : nameParts[0];
    return `${emailName}${randomString}@opss.org`;
  };

  const handleGenerate = () => {
    const generatedPassword = generatePassword();
    const generatedEmail = generateEmail(form.name);

    setForm({
      ...form,
      email: generatedEmail,
      password: generatedPassword,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/co-operator', form);

      if (response.status === 201) {
        console.log('Registrasi berhasil', response.data);
        toast.success('Sign up account success!');
      }
    } catch (error: any) {
      console.error('Registrasi gagal', error);
      toast.error('Sign up account failed: ' + error.message);
    }
  };

  return (
      <div className="bg-white p-6 rounded-lg">
        <div className="mt-6">
          <h3 className="text-lg font-medium">Co Operator</h3>
          <p className="text-sm text-gray-600">
            Below is a list of co-operator account according to the conference you have.
        </p>
        <hr className="mt-2"/>

        <h4 className="text-md font-medium mt-4 text-gray-700">Add Co-Operator Account</h4>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="mt-1 block px-3 py-2 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-950 sm:text-sm w-1/2"
                placeholder="Enter co-operator name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-950 sm:text-sm"
                placeholder="Enter/generate co-operator email"
              />
            </div>

            <div className="mb-4 relative">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative w-1/2">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-950 sm:text-sm pr-10"
                  placeholder="Enter/generate co-operator password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center"
                >
                  {passwordVisible ? (
                    <EyeIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Conference
              </label>
              <select
                id="conference"
                name="conference"
                className="mt-1 block w-1/2 pl-4 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-950 focus:border-blue-950 sm:text-sm rounded-lg bg-white shadow-sm"
                onChange={(e) => setSelectedConference(Number(e.target.value))}
                value={selectedConference || ''}
              >
                <option value="">Select a Conference</option>
                {conferences.length > 0 ? (
                  conferences.map((conference) => (
                    <option key={conference.id} value={conference.id}>
                      {conference.name}
                    </option>
                  ))
                ) : (
                  <option value="">No conferences available</option>
                )}
              </select>
            </div>

            <button
              type="button"
              onClick={handleGenerate}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
            >
              Generate Email & Password
            </button>

            <button
              type="submit"
              className="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-950 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-950"
            >
              Save Co-Operator Account
            </button>
          </form>

        {/* Table Section */}
        <div className="mt-6 p-4 bg-gray-25 rounded-md border border-gray-100">        
          <h4 className="text-md font-medium mt-4 text-gray-700">Example Conference by Online Paper Submission System</h4>
            <table className="min-w-full divide-y divide-gray-50 mt-6">
                <thead className="bg-gray-50">
                  <tr className="text-xs border-b border-gray-200">
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Co Operator Name
                    </th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-gray-700 text-xs border-b border-gray-200">
                    <td className="py-2">John Doe</td>
                    <td className="py-2">johndoe@xyz.edu</td>
                    <td className="flex py-2">
                      <button className="text-blue-600 hover:text-blue-800 mr-2">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div> 
          </div>
        </div>

  );
};

export default AddCoOperator;
