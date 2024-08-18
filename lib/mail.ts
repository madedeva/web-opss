import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'vince.koepp93@ethereal.email',
      pass: 'tAnkdCeTcDzbYnwzXK'
  }
});

export async function sendResetPasswordEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

  const mailOptions = {
    from: 'vince.koepp93@ethereal.email',
    to: email,
    subject: 'Password Reset Request',
    text: `You have requested a password reset. Please use the following link to reset your password: ${resetUrl}`,
    html: `<p>You have requested a password reset. Please use the following link to reset your password: <a href="${resetUrl}">Reset Password</a></p>`,
  };

  await transporter.sendMail(mailOptions);
}
