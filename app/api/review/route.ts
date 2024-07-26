import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type {Con_Reviewer} from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
    const body: Con_Reviewer = await request.json();

    const product = await prisma.con_Reviewer.create({
        data: {
            userId: body.userId,
            conferenceId: body.conferenceId
        }
    });

    return NextResponse.json(product, {status: 201});
}