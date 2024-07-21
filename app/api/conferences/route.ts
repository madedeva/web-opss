import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type {Conference} from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
    const body: Conference = await request.json();

    const slug = body.name.toLowerCase().replace(/ /g, "-") + "-" + Date.now();

    const product = await prisma.conference.create({
        data: {
            ...body,
            slug
        }
    });

    return NextResponse.json(product, {status: 201});
}