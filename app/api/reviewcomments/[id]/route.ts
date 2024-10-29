import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const { comments, status, sendReview } = await request.json();

    try {
        const updatedReview = await prisma.reviewComments.update({
            where: { id: Number(id) },
            data: {
                comments,
                status,
                sendReview,
            },
        });

        return NextResponse.json(updatedReview, { status: 200 });
    } catch (error) {
        console.error("Error updating review comment:", error);
        return NextResponse.json({ error: "Error updating review comment" }, { status: 500 });
    }
}