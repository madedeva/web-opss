import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { promises as fs } from "fs";
import path from "path";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
    try {
        const formData = await request.formData();

        const paperFile = formData.get("paper") as Blob | null;
        const paperTitle = formData.get("paper_title") as string;
        const abstract = formData.get("abstract") as string;
        const keywords = formData.get("keywords") as string;
        const topic = formData.get("topic") as string;
        const submissionId = formData.get("submissionId") as string;

        if (!paperFile) {
            return NextResponse.json({ error: "Paper file is missing" }, { status: 400 });
        }

        const submission = await prisma.registerConference.findUnique({
            where: { id: Number(submissionId) },
        });

        if (!submission) {
            return NextResponse.json({ error: "Invalid submission ID" }, { status: 400 });
        }

        const paper = formData.get("paper") as File;
        if (paper){
            const arrayBufferPaper = await paper.arrayBuffer();
            const bufferPaper = new Uint8Array(arrayBufferPaper);
            await fs.writeFile(`./public/uploads/papers/${paper.name}`, bufferPaper);
        }

        const revision = await prisma.revision.create({
            data: {
                paper_title: paperTitle,
                abstract,
                keywords,
                topic,
                paper: paper.name,
                submissionId: Number(submissionId.toString()),
            },
        });

        return NextResponse.json(revision, { status: 201 });
    } catch (error) {
        console.error("Error creating revision:", error);
        return NextResponse.json({ error: "Failed to create revision" }, { status: 500 });
    }
};
