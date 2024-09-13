import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
    try {
        const { userIds, registerConferenceId } = await request.json();

        if (!userIds || !registerConferenceId) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const createdReviewers = await prisma.reviewPaper.createMany({
            data: userIds.map((userId: number) => ({
                reviewerId: userId,
                registerConferenceId,
            })),
            skipDuplicates: true,
        });

        if (createdReviewers.count === 0) {
            return NextResponse.json({ message: "No new reviewers to add" }, { status: 200 });
        }

        return NextResponse.json({ message: 'Reviewers assigned successfully', data: createdReviewers }, { status: 201 });
    } catch (error) {
        console.error('Failed to assign reviewers:', error);
        return NextResponse.json({ message: 'Failed to assign reviewers' }, { status: 500 });
    }
};


export const GET = async (request: Request) => {
    try {
        const reviewers = await prisma.reviewPaper.findMany({
            where: {
                id: Number(),
            },
            include: {
                reviewer: true,
            }
        });

        if (reviewers.length === 0) {
            return NextResponse.json({ message: "No reviewers found" }, { status: 404 });
        }

        return NextResponse.json({ message: 'Reviewers retrieved successfully', data: reviewers }, { status: 200 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Failed to retrieve reviewers:', errorMessage);
        return NextResponse.json({ message: 'Failed to retrieve reviewers', error: errorMessage }, { status: 500 });
    }
};
