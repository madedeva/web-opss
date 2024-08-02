import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type {RegisterConference} from "@prisma/client";

const prisma = new PrismaClient();

export const PATCH = async (request: Request, {params}: {params: {id: string}}) => {
    const body: RegisterConference = await request.json();
    const con = await prisma.registerConference.update({
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

    const con = await prisma.registerConference.delete({
        where: {
            id: Number(params.id)
        }
    });

    return NextResponse.json(con, {status: 200});
}


export const GET = async (request: Request, {params}: {params: {id: string}}) => {
    const con = await prisma.registerConference.findUnique({
        where: {
            id: Number(params.id)
        }
    });

    return NextResponse.json(con, {status: 200});
}