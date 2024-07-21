import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type {Product} from "@prisma/client";

const prisma = new PrismaClient();

export const PATCH = async (request: Request, {params}: {params: {id: string}}) => {
    const body: Product = await request.json();
    const product = await prisma.conference.update({
        where: {
            id: Number(params.id)
        },
        data: {
            ...body,
        }
    });

    return NextResponse.json(product, {status: 200});
}

export const DELETE = async (request: Request, {params}: {params: {id: string}}) => {

    const product = await prisma.conference.delete({
        where: {
            id: Number(params.id)
        }
    });

    return NextResponse.json(product, {status: 200});
}