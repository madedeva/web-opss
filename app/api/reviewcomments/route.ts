import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { ReviewComments } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
    try {
        const body: ReviewComments = await request.json();

        console.log("Received data:", body);

        const reviewcomments = await prisma.reviewPaper.findUnique({
            where: { id: body.reviewId },
        });

        if (!reviewcomments) {
            return NextResponse.json({ error: "Invalid submission ID" }, { status: 400 });
        }

        const authors = await prisma.reviewComments.create({
            data: {
                comments: body.comments,
                status: body.status,
                sendReview: body.sendReview,
                reviewId: body.reviewId,

            },
        });

        return NextResponse.json(reviewcomments, { status: 201 });
    } catch (error) {
        console.error("Error creating author:", error);
        return NextResponse.json({ error: "Failed to create author" }, { status: 500 });
    }
};
