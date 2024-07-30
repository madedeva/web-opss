import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type {RegisterConference} from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
    const body: RegisterConference = await request.json();

    const country = body.country;

    const con = await prisma.registerConference.create({
        data: {
            ...body,
            country
        }
    });

    return NextResponse.json(con, {status: 201});
}