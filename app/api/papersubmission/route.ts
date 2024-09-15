import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (request: Request) => {
    try {
        const url = new URL(request.url);
        const userId = Number(url.searchParams.get('userId'));

        if (isNaN(userId)) {
            return NextResponse.json({ error: 'Invalid userId' }, { status: 400 });
        }

        const papers = await prisma.registerConference.findMany({
            where : {
              conference : {
                userId : userId
              },
            },
            include:{
                conference: {
                    include: {
                      User: {
                        select: {
                          name: true,
                          email: true,
                        },
                      },
                    },
                  },
                  user: {
                    select: {
                      name: true,
                      email: true,
                    },
                  },
                  ReviewComments: {
                    select: {
                      comments: true
                    }
                  }
                },
            });
        
            console.log(userId)
        return NextResponse.json(papers);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ status: "fail", error: e });
    }
}
