import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async () => {
    try {
        const conferences = await prisma.conference.findMany({
            select: {
                id: true,
                name: true,
                startDate: true,
                endDate: true,
                submission_deadlineEnd: true,
                submission_deadlineStart: true,
                city: true,
                country: true,
                banner: true,
                slug: true,
                status: true,
                paper_template: true,
            },
        }) 
        return NextResponse.json(conferences); 
    }catch (e){
        console.error(e);
        return NextResponse.json({ status: "fail", error: e });
    }
}