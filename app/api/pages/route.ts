import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const pages = await prisma.page.findMany({
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      slug: true,
      title: true,
      status: true,
      updatedAt: true,
    },
  });
  return NextResponse.json(pages);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { title, slug, content } = body;

  const author = await prisma.user.findFirst({ orderBy: { createdAt: "asc" } });
  if (!author) return NextResponse.json({ error: "No user found" }, { status: 500 });

  const page = await prisma.page.create({
    data: {
      title,
      slug: slug || `${title.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
      content: JSON.stringify(content),
      authorId: author.id,
    },
  });

  return NextResponse.json(page, { status: 201 });
}
