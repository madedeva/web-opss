import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (req: Request) => {
    const url = new URL(req.url);
    const registerConferenceId = url.searchParams.get("registerConferenceId");
  
    if (!registerConferenceId) {
      return NextResponse.json({ status: "fail", message: "registerConference ID is required" }, { status: 400 });
    }
  
    try {
      // Fetch the registerConference and related Conference
      const registerConference = await prisma.registerConference.findUnique({
        where: { id: parseInt(registerConferenceId) },
        include: {
          conference: {
            select: { topic: true }
          }
        }
      });
  
      if (!registerConference || !registerConference.conference) {
        return NextResponse.json({ status: "fail", message: "No related conference found" }, { status: 404 });
      }
  
      const topics = registerConference.conference.topic ? registerConference.conference.topic.split(",") : [];
  
      return NextResponse.json({ status: "success", topics });
    } catch (error) {
      console.error("Error fetching topics:", error);
      return NextResponse.json({ status: "fail", message: "Error fetching topics" }, { status: 500 });
    }
  };