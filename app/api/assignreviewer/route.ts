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
        const url = new URL(request.url);
        const registerConferenceId = url.searchParams.get('registerConferenceId');

        if (!registerConferenceId) {
            return NextResponse.json({ message: 'registerConferenceId is required' }, { status: 400 });
        }

        // Menghitung jumlah review yang dilakukan oleh setiap reviewer untuk conference tertentu
        const reviewCounts = await prisma.reviewPaper.groupBy({
            by: ['reviewerId'],
            _count: {
                id: true, // Menghitung jumlah review
            },
            where: {
                registerConferenceId: Number(registerConferenceId),
            },
        });

        // Mengambil informasi reviewer dari user
        const reviewers = await prisma.user.findMany({
            where: {
                id: {
                    in: reviewCounts.map(review => review.reviewerId),
                },
            },
            select: {
                id: true,
                name: true,
            },
        });

        // Gabungkan data reviewer dengan jumlah review yang telah mereka lakukan
        const result = reviewers.map(reviewer => {
            const reviewCount = reviewCounts.find(review => review.reviewerId === reviewer.id);
            return {
                reviewerId: reviewer.id,
                reviewerName: reviewer.name,
                totalReviewsCount: reviewCount ? reviewCount._count.id : 0, // Menghitung total review
            };
        });

        return NextResponse.json({ message: 'Reviewers retrieved successfully', data: result }, { status: 200 });
    } catch (error) {
        console.error('Failed to retrieve reviewer stats:', error); // Logging
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ message: 'Failed to retrieve reviewer stats', error: errorMessage }, { status: 500 });
    }
};
  
