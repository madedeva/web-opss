import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type {Conference} from "@prisma/client";

const prisma = new PrismaClient();

export const PATCH = async (request: Request, {params}: {params: {id: string}}) => {
    const body: Conference = await request.json();
    const con = await prisma.conference.update({
        where: {
            id: Number(params.id)
        },
        data: {
            ...body,
        }
    });

    return NextResponse.json(con, {status: 200});
}

export const DELETE = async (request: Request, {params}: {params: {id: string}}) => {

    const con = await prisma.conference.delete({
        where: {
            id: Number(params.id)
        }
    });

    return NextResponse.json(con, {status: 200});
}

// show conference
export const GET = async (request: Request, {params}: {params: {id: string}}) => {
    const con = await prisma.conference.findUnique({
        where: {
            id: Number(params.id)
        }
    });

    return NextResponse.json(con, {status: 200});
}