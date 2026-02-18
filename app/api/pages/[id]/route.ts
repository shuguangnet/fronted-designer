import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const page = await prisma.page.findUnique({ where: { id } });
  if (!page) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({
    ...page,
    content: JSON.parse(page.content),
  });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const { title, content, status } = body;

  const page = await prisma.page.update({
    where: { id },
    data: {
      ...(title && { title }),
      ...(status && { status }),
      ...(content && { content: JSON.stringify(content) }),
    },
  });

  return NextResponse.json(page);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.page.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
