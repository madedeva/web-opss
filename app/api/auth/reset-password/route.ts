import { NextResponse } from 'next/server';
import { resetPassword, verifyPasswordResetToken } from '@/lib/user';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token, password } = body;

    if (!token || !password || typeof token !== 'string' || typeof password !== 'string') {
      return NextResponse.json({ message: 'Invalid request data' }, { status: 400 });
    }

    const user = await verifyPasswordResetToken(token)

    await resetPassword(user!.id.toString(), password);

    return NextResponse.json({ status:true,  message: 'Password has been reset successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error resetting password:', error);
    return NextResponse.json({ status:false, message: 'Internal server error' }, { status: 500 });
  }
}
