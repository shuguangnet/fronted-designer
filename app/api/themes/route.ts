import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const themes = await prisma.theme.findMany({
    orderBy: { usageCount: "desc" },
  });
  return NextResponse.json(
    themes.map((t) => ({ ...t, config: JSON.parse(t.config) }))
  );
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, displayName, description, config, category } = body;

  const theme = await prisma.theme.create({
    data: {
      name,
      displayName,
      description,
      config: JSON.stringify(config),
      category,
    },
  });

  return NextResponse.json(theme, { status: 201 });
}
