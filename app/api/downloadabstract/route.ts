import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const conferenceId = Number(url.searchParams.get('conferenceId'));

    if (isNaN(conferenceId)) {
      return NextResponse.json({ error: 'Invalid conferenceId' }, { status: 400 });
    }

    const papers = await prisma.registerConference.findMany({
      where: {
        conferenceId: conferenceId,
      },
      select: {
        paper_title: true,
        abstract: true,
        keywords: true,
      },
    });

    return NextResponse.json(papers);
  } catch (e:any) {
    console.error(e);
    return NextResponse.json({ status: "fail", error: e.message }, { status: 500 });
  }
};
