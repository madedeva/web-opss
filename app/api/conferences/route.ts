import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type {Conference} from "@prisma/client";
import formidable from 'formidable';
import { revalidatePath } from "next/cache";
import fs from "node:fs/promises";
import path from 'path';

export const config = {
    api: {
      bodyParser: false, // Disable the built-in body parser to handle file uploads manually
    },
};

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
    try {
        // Upload File Logic
        const formData = await req.formData();
    
        const paper_template = formData.get("paper_template") as File;
        const banner = formData.get("banner") as File;
        const arrayBufferPT = await paper_template.arrayBuffer();
        const arrayBufferBN = await banner.arrayBuffer();
        const bufferPT = new Uint8Array(arrayBufferPT);
        const bufferBN = new Uint8Array(arrayBufferBN);
        await fs.writeFile(`./public/uploads/paper_template/${paper_template.name}`, bufferPT);
        await fs.writeFile(`./public/uploads/banner/${banner.name}`, bufferBN);
    
        const name = formData.get("name")?.valueOf().toString();
        
        const slug = name?.toLowerCase().replace(/ /g, "-") + "-" + Date.now();
        
        const con = await prisma.conference.create({
            data: {
                acronym: formData.get("acronym")?.valueOf().toString() ?? '',
                banner: banner.name,
                address: formData.get("address")?.valueOf().toString() ?? '',
                city: formData.get("city")?.valueOf().toString() ?? '',
                country: formData.get("country")?.valueOf().toString() ?? '',
                description: formData.get("description")?.valueOf().toString() ?? '',
                email: formData.get("email")?.valueOf().toString() ?? '',
                endDate: formData.get("endDate")?.valueOf().toString() ?? '',
                institution: formData.get("institution")?.valueOf().toString() ?? '',
                name: formData.get("name")?.valueOf().toString() ?? '',
                paper_template: paper_template.name,
                payment_info: formData.get("payment_info")?.valueOf().toString() ?? '',
                startDate: formData.get("startDate")?.valueOf().toString() ?? '',
                submission_deadlineEnd: formData.get("submission_deadlineEnd")?.valueOf().toString() ?? '',
                submission_deadlineStart: formData.get("submission_deadlineStart")?.valueOf().toString() ?? '',
                theme: formData.get("theme")?.valueOf().toString() ?? '',
                topic: formData.get("topic")?.valueOf().toString() ?? '',
                venue: formData.get("venue")?.valueOf().toString() ?? '',
                userId: parseInt(formData.get("userId")?.valueOf().toString() ?? '0'),
                status: 'Inactive',
                slug
            }
        });
        
        revalidatePath("/");
        return NextResponse.json({ status: "success" });
      } catch (e) {
        console.error(e);
        return NextResponse.json({ status: "fail", error: e });
      }
}