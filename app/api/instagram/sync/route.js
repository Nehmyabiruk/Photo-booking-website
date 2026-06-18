import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const userId = process.env.INSTAGRAM_USER_ID;

    if (!accessToken || !userId) {
      return NextResponse.json({
        success: false,
        message: "Instagram not connected yet",
      });
    }

    // Fetch Instagram media
    const url = `https://graph.instagram.com/${userId}/media?fields=id,caption,media_url,permalink,timestamp&access_token=${accessToken}`;

    const res = await fetch(url);
    const data = await res.json();

    if (!data.data) {
      return NextResponse.json({ success: false, data });
    }

    // Save posts to DB
    for (const post of data.data) {
      await prisma.instagramPost.upsert({
        where: { igId: post.id },
        update: {
          caption: post.caption,
          mediaUrl: post.media_url,
          postUrl: post.permalink,
          timestamp: new Date(post.timestamp),
        },
        create: {
          igId: post.id,
          caption: post.caption,
          mediaUrl: post.media_url,
          postUrl: post.permalink,
          timestamp: new Date(post.timestamp),
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Instagram synced",
      count: data.data.length,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, error: "Sync failed" },
      { status: 500 }
    );
  }
}