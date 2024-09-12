import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type {Con_Reviewer} from "@prisma/client";

const prisma = new PrismaClient();

interface Con_ReviewerRequest {
  userIds: number[]; // Changed from single userId to an array
  conferenceId: number;
}

export const POST = async (request: Request) => {
  const { userIds, conferenceId }: { userIds: number[], conferenceId: number } = await request.json();

  try {
      // Check for existing reviewers
      const existingReviewers = await prisma.con_Reviewer.findMany({
          where: {
              conferenceId,
              userId: {
                  in: userIds,
              },
          },
      });

      // Extract the existing reviewer user IDs
      const existingReviewerIds = new Set(existingReviewers.map(reviewer => reviewer.userId));

      // Filter out the userIds that are already added
      const newUserIds = userIds.filter(userId => !existingReviewerIds.has(userId));

      // If there are new reviewers, add them
      if (newUserIds.length > 0) {
          await prisma.con_Reviewer.createMany({
              data: newUserIds.map(userId => ({
                  userId,
                  conferenceId,
              })),
          });
      }

      const addedReviewers = newUserIds.length > 0
          ? `Added reviewers: ${newUserIds.join(', ')}`
          : 'No new reviewers to add';

      return NextResponse.json({ message: addedReviewers }, { status: 201 });
  } catch (error) {
      console.error('Failed to add reviewers:', error);
      return NextResponse.json({ message: 'Failed to add reviewers' }, { status: 500 });
  }
};

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