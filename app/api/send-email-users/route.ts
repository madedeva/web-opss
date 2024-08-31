import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (request: Request) => {
    const reviewer = await prisma.user.findMany();

    return NextResponse.json(reviewer, {status: 200});
}