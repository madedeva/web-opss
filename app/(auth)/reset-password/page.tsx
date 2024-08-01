"use client"
import { useState } from 'react';
import { useParams } from "next/navigation";

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const params = useParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = params.token;
    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    });
    const data = await res.json();
    if (data.success) {
      setMessage('Password has been reset. Please sign in.');
      window.location.href = '/signin';
    } else {
      setMessage('Something went wrong, please try again.');
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-semibold text-center">Reset Password</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <label htmlFor="password">New Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <button type="submit" className="mt-4 bg-blue-500 text-white p-2">Reset Password</button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default ResetPassword;