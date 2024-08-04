import { NextApiRequest, NextApiResponse } from 'next';
import { sendResetPasswordEmail } from '@/lib/mail';
import { findUserByEmail, createPasswordResetToken } from '@/lib/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'No user found with this email address' });
    }

    const token = await createPasswordResetToken(user.id.toString());
    await sendResetPasswordEmail(email, token);

    res.status(200).json({ message: 'Password reset link has been sent to your email' });
  } catch (error) {
    console.error('Error processing forgot password request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
