import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const posts = await prisma.instagramPost.findMany({
      orderBy: { timestamp: "desc" },
    });

    return NextResponse.json({
      success: true,
      posts,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}