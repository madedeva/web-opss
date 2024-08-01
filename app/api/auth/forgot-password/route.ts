import { NextApiRequest, NextApiResponse } from 'next';
import { sendResetPasswordEmail } from '@/lib/mail';
import { findUserByEmail, createPasswordResetToken } from '@/lib/user';

const errorHandler = (res: NextApiResponse, statusCode: number, message: string) => {
  res.status(statusCode).json({ message });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email || typeof email !== 'string') {
      return errorHandler(res, 400, 'Invalid email address');
    }

    try {
      const user = await findUserByEmail(email);
      if (!user) {
        return errorHandler(res, 404, 'No user found with this email address');
      }

      const token = await createPasswordResetToken(user.id.toString());
      await sendResetPasswordEmail(email, token);

      res.status(200).json({ message: 'Password reset link has been sent to your email' });
    } catch (error) {
      console.error('Error processing forgot password request:', error);
      errorHandler(res, 500, 'Internal server error');
    }
  }
}