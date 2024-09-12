import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
    try {
        const { userIds, registerConferenceId } = await request.json(); // Make sure this matches the client payload

        // Validate required fields
        if (!userIds || !registerConferenceId) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        // Create many review assignments for each userId (reviewer)
        const createdReviewers = await prisma.reviewPaper.createMany({
            data: userIds.map((userId: number) => ({
                reviewerId: userId, // Assuming reviewerId is related to userId
                registerConferenceId,
            })),
            skipDuplicates: true, // To avoid duplicate entries
        });

        // Check if any rows were created, otherwise return a warning message
        if (createdReviewers.count === 0) {
            return NextResponse.json({ message: "No new reviewers to add" }, { status: 200 });
        }

        return NextResponse.json({ message: 'Reviewers assigned successfully', data: createdReviewers }, { status: 201 });
    } catch (error) {
        console.error('Failed to assign reviewers:', error);
        return NextResponse.json({ message: 'Failed to assign reviewers' }, { status: 500 });
    }
};
