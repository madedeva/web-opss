import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { ReviewComments } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
    try {
        const body: ReviewComments = await request.json();

        console.log("Received data:", body);

        const submission = await prisma.registerConference.findUnique({
            where: { id: body.submissionId },
        });

        if (!submission) {
            return NextResponse.json({ error: "Invalid submission ID" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { id: body.userId },
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
        }

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

export const GET = async (request: Request) => {
    try {
        const { searchParams } = new URL(request.url);
        const submissionId = searchParams.get('submissionId');

        if (!submissionId) {
            return NextResponse.json({ error: "Submission ID is required" }, { status: 400 });
        }

        const submissionIdNumber = parseInt(submissionId, 10);
        if (isNaN(submissionIdNumber)) {
            return NextResponse.json({ error: "Invalid Submission ID format" }, { status: 400 });
        }

        const submission = await prisma.registerConference.findUnique({
            where: { id: submissionIdNumber },
            include: {
                ReviewComments: {
                    include: {
                        User: true,
                    }
                }
            },
        });

        if (!submission) {
            return NextResponse.json({ error: "Submission not found" }, { status: 404 });
        }

        return NextResponse.json(submission, { status: 200 });
    } catch (error) {
        console.error("Error retrieving submission:", error);
        return NextResponse.json({ error: "Failed to retrieve submission" }, { status: 500 });
    }
};
