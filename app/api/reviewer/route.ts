import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type {Con_Reviewer} from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
    const body: Con_Reviewer = await request.json();

    const reviewer = await prisma.con_Reviewer.create({
        data: {
            userId: body.userId,
            conferenceId: body.conferenceId
        }
    });

    return NextResponse.json(reviewer, {status: 201});
}

export const GET = async (req: NextRequest) => {
    try {
      const { searchParams } = new URL(req.url);
      const userId = searchParams.get('userId');
      // const conferenceId = searchParams.get('conferenceId');
  
      if (!userId) {
        return NextResponse.json({ message: 'userId diperlukan' }, { status: 400 });
      }
  
      // Query Reviewer berdasarkan userId dan conferenceId
      const reviewers = await prisma.con_Reviewer.findMany({
        where: {
          conference: {
            userId: Number(userId), // Konversi userId ke number
          },
        },
        include: {
          user: true, // Sertakan data user
          conference: true, // Sertakan data conference
        },
      });
  
      return NextResponse.json(reviewers, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Terjadi kesalahan' }, { status: 500 });
    }
  };