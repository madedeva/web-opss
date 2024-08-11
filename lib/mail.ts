import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'yuda.aditya@undiksha.ac.id',
    pass: 'yusagita'
  },
});

export async function sendResetPasswordEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

  const mailOptions = {
    from: 'yuda.aditya@undiksha.ac.id',
    to: email,
    subject: 'Password Reset Request',
    text: `You have requested a password reset. Please use the following link to reset your password: ${resetUrl}`,
    html: `<p>You have requested a password reset. Please use the following link to reset your password: <a href="${resetUrl}">Reset Password</a></p>`,
  };

  await transporter.sendMail(mailOptions);
}
