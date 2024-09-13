import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
    try {
        const body = await request.json();

        console.log("Received data:", body);

        const reviewPaper = await prisma.reviewPaper.findUnique({
            where: { id: body.reviewId },
        });

        if (!reviewPaper) {
            console.log("Invalid reviewPaper ID");
            return NextResponse.json({ error: "Invalid reviewPaper ID" }, { status: 400 });
        }

        const commentsreview = await prisma.reviewComments.create({
            data: {
                comments: body.comments,
                status: body.status,
                sendReview: "No",
                reviewId: body.reviewId,
            },
        });

        return NextResponse.json(commentsreview, { status: 201 });
    } catch (error) {
        console.error("Error creating review comment:", error);
        return NextResponse.json({ error: "Failed to create review comment" }, { status: 500 });
    }
};

