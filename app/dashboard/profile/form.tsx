'use client'
import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type User = {
    id: number;
    name: string;
    email: string;
    roleId: number;
}

const Form = () => {
    
    const { data: session, status, update } = useSession()

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (session?.user) {
            const user = session.user as User;
            setForm({
                id: user.id,
                name: user.name,
                email: user.email,
                password: '',
                passwordNew: '',
                passwordConfirm: '',
            });
        }
    }, [session]);

    const [form, setForm] = useState({
        id: 0,
        name: '',
        email: '',
        password: '',
        passwordNew: '',
        passwordConfirm: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({
          ...form,
          [name]: value,
        });
      };
    
    if (status === 'loading') {
        return <div>Loading...</div>;
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
    
        try {
          if (form.password == form.passwordConfirm && (form.password !== '' || form.passwordConfirm !== '')){
              const response = await axios.patch('/api/profile', form);
        
              if (response.status === 200) {
                console.log('Update Profile berhasil', response.data);

                // Update session user data
                const updatedSession = await getSession();
                // Pikirkan cara agar bisa melakukan update di session
                // update({
                //     user: {
                //         email: response.data.email,
                //         name: response.data.name,
                //     }
                // });

                console.log(updatedSession);

                toast.success('Update account success!');
              } else {
                toast.error('Update account failed: ' + response.data.error);
              }
          } else {
            toast.error('Konfirmasi Password tidak sama dengan Password');
          }
        } catch (error: any) {
          console.error('Update Profile gagal', error);
          toast.error('Update account failed: ' + error.message);
        } finally {
            setLoading(false);
        }
      };
    
    return (
    <form onSubmit={handleSubmit}>
        <ToastContainer />
        <h2 className="text-xl font-semibold mb-4 mt-4">Profile Information</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="col-span-1">
                <label className="block mb-2 text-sm font-medium">Name</label>
                <input name="name" type="text" className="block w-full p-2 border bg-white rounded" onChange={handleChange} value={form.name}/>
            </div>
            <div className="col-span-1">
                <label className="block mb-2 text-sm font-medium">Email</label>
                <input name="email" type="email" className="block w-full p-2 border bg-white rounded" onChange={handleChange} value={form.email}/>
            </div>
        </div>
        <h2 className="text-xl font-semibold mb-4">Update Password</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="col-span-1">
                <label className="mb-2 text-sm font-medium flex">Current Password<p className="text-red-600">*</p></label>
                <input name="password" type="password" onChange={handleChange} value={form.password} className="block w-full p-2 border bg-white rounded"/>
            </div>
            <div className="col-span-1">
                <label className="mb-2 text-sm font-medium flex">New Password<p className="text-red-600">*</p></label>
                <input name="passwordNew" type="password" onChange={handleChange} value={form.passwordNew} className="block w-full p-2 border bg-white rounded"/>
            </div>
            <div className="col-span-1">
                <label className="mb-2 text-sm font-medium flex">Confirm Password<p className="text-red-600">*</p></label>
                <input name="passwordConfirm" type="password" onChange={handleChange} value={form.passwordConfirm} className="block w-full p-2 border bg-white rounded"/>
            </div>
        </div>
        <div className="mt-6 text-right">
            <button type="submit" className="px-4 py-2 bg-blue-700 text-white rounded-md shadow-sm" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Profile'}
            </button>
        </div>
    </form>
  );
};

export default Form;
