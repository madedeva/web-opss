import { NextApiRequest, NextApiResponse } from 'next';
import { resetPassword } from '@/lib/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
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