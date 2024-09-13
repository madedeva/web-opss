import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { ReviewComments } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
    try {
        const body: ReviewComments = await request.json();

        console.log("Received data:", body);

        // Check if the submission exists
        const submission = await prisma.registerConference.findUnique({
            where: { id: body.submissionId },
        });

        if (!submission) {
            return NextResponse.json({ error: "Invalid submission ID" }, { status: 400 });
        }

        // Check if the user exists
        const user = await prisma.user.findUnique({
            where: { id: body.userId },
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
        }

        // Create the review comment
        const reviewComment = await prisma.reviewComments.create({
            data: {
                comments: body.comments,
                status: body.status,
                sendReview: body.sendReview || "No",
                submissionId: body.submissionId,
                userId: body.userId,
            },
        });

        return NextResponse.json(reviewComment, { status: 201 });
    } catch (error) {
        console.error("Error creating review comment:", error);
        return NextResponse.json({ error: "Failed to create review comment" }, { status: 500 });
    }
};
