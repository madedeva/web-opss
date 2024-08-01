import { NextApiRequest, NextApiResponse } from 'next';
import { resetPassword } from '@/lib/user';

const handleMethodNotAllowed = (res: NextApiResponse) => {
  res.status(405).json({
    error: 'Method Not Allowed',
    message: 'Only POST requests are allowed for this route',
    allowedMethods: ['POST'],
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return handleMethodNotAllowed(res);
  }

  const { token, newPassword } = req.body;

  if (!token || !newPassword || typeof token !== 'string' || typeof newPassword !== 'string') {
    return res.status(400).json({ message: 'Invalid request data' });
  }

  try {
    await resetPassword(token, newPassword);
    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}