import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const replacePlaceholders = (template: string, replacements: Record<string, string>) => {
  let result = template;
  for (const [key, value] of Object.entries(replacements)) {
    result = result.replace(new RegExp(`<${key}>`, 'g'), value);
  }
  return result;
};

export async function POST(request: Request) {
  try {
    const { userId, userIdSender, subject, messageTemplate } = await request.json();

    if (!userId || !Array.isArray(userId) || userId.length === 0) {
      return NextResponse.json({ error: 'User IDs tidak valid' }, { status: 400 });
    }

    if (!subject || !messageTemplate) {
      return NextResponse.json({ error: 'Subject dan message diperlukan' }, { status: 400 });
    }

    const users = await prisma.user.findMany({
      where: { id: { in: userId } },
    });

    if (users.length === 0) {
      return NextResponse.json({ error: 'Tidak ada pengguna ditemukan' }, { status: 404 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'deva.kerti@undiksha.ac.id',
        pass: 'zntegtyxgvnqojbn'
      }
    });

    const emailPromises = users.map(async (user) => {
      const registerConference = await prisma.registerConference.findFirst({
        where: { userId: user.id },
      });

      if (!registerConference) {
        return NextResponse.json({ error: 'Tidak ada data register conference' }, { status: 404 });
      }

      const conference = await prisma.conference.findFirst({
        where: { id: registerConference.conferenceId },
      });

      if (!conference) {
        return NextResponse.json({ error: 'Tidak ada data conference' }, { status: 404 });
      }

      // Define replacements
      const replacements = {
        name: user.name,
        title: registerConference.paper_title,
        abstract: registerConference.abstract,
        conference: conference.name
      };

      // Replace placeholders in both subject and message
      const personalizedSubject = replacePlaceholders(subject, replacements);
      const message = replacePlaceholders(messageTemplate, replacements);

      await prisma.emails.create({
        data: {
          message: message,
          subject: personalizedSubject,
          userId: userIdSender,
          conferenceId: conference.id
        }
      });

      return transporter.sendMail({
        to: user.email,
        subject: personalizedSubject,
        text: message,
      });
    });

    await Promise.all(emailPromises);

    return NextResponse.json({ message: 'Email berhasil dikirim' });
  } catch (error) {
    console.error('Error sending emails:', error);
    return NextResponse.json({ error: 'Gagal mengirim email' }, { status: 500 });
  }
}

export const GET = async (request: Request) => {
  const emails = await prisma.emails.findMany({
    include: {
      conference: true,
      sender: true
    }
  });

  return NextResponse.json(emails, { status: 200 });
}
