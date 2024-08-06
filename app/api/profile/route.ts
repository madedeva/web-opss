import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { User } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const PATCH = async (request: Request) => {
  try {
    const body: User = await request.json();
    
    // Validasi password
    if (!body.password || body.password.length < 8) {
      return NextResponse.json({ error: "Password harus memiliki minimal 8 karakter." }, { status: 400 });
    }
    
    // Validasi email
    if (!body.email || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(body.email)) {
      return NextResponse.json({ error: "Email tidak valid." }, { status: 400 });
    }

    // Enkripsi password
    const hashedPassword = await bcrypt.hash(body.password, 10);

    // Simpan pengguna ke database
    const user = await prisma.user.update({
      where: {
        id: body.id
      },
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      }
    });

    return NextResponse.json({
        name: user.name,
        email: user.email
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
