import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { User } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  try {
    const body: User & { conferenceId: number } = await request.json();
    
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.{8,})/;
    if (!body.password || !passwordRegex.test(body.password)) {
      return NextResponse.json({ error: "Password harus memiliki minimal 8 karakter, mengandung huruf kapital, dan simbol." }, { status: 400 });
    }
    
    if (!body.email || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(body.email)) {
      return NextResponse.json({ error: "Email tidak valid." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
        roleId: Number(body.roleId),
        CoOperator: {
          create: {
            conferenceId: Number(body.conferenceId),
          }
        }
      }
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
