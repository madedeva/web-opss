"use client"
import { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    console.log('Sending request with email:', email);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        setError(`Error ${res.status}: ${res.statusText} - ${errorText}`);
        return;
      }
      
      const data = await res.json();
      if (data.success) {
        setMessage('Please check your email for a reset link.');
      } else {
        setError('Something went wrong, please try again.');
      }
    } catch (error) {
      console.error('Error sending request:', error);
      setError('An error occurred while sending the request.');
    }    
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-semibold text-center">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <button type="submit" className="mt-4 bg-blue-500 text-white p-2">Send Reset Link</button>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default ForgotPassword;