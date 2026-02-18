import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { z } from "zod";

const createPageSchema = z.object({
  title: z.string().min(1, "标题不能为空").max(200, "标题过长"),
  slug: z.string().optional(),
  description: z.string().optional(),
  content: z.record(z.any()).optional(),
  themeId: z.string().optional(),
});

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, error: "未授权" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const where = status ? { status: status as any } : {};

    const pages = await prisma.page.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        status: true,
        themeId: true,
        updatedAt: true,
        createdAt: true,
        author: { select: { id: true, name: true, email: true } },
      },
    });

    return NextResponse.json({ success: true, data: pages });
  } catch (error) {
    console.error("Error fetching pages:", error);
    return NextResponse.json(
      { success: false, error: "获取页面列表失败" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "请先登录" },
        { status: 401 }
      );
    }

    const body = await req.json();

    // Validate input
    const validationResult = createPageSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "数据验证失败",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { title, slug, description, content, themeId } = validationResult.data;

    // Check if slug already exists
    if (slug) {
      const existing = await prisma.page.findUnique({ where: { slug } });
      if (existing) {
        return NextResponse.json(
          { success: false, error: "该 URL 已存在" },
          { status: 409 }
        );
      }
    }

    // Generate slug if not provided
    const finalSlug = slug || `${title.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`;

    const page = await prisma.page.create({
      data: {
        title,
        slug: finalSlug,
        description,
        content: JSON.stringify(content || { version: "1.0", meta: { title }, root: { id: "root", type: "container", props: {}, children: [] } }),
        authorId: (session.user as any).id,
        themeId,
        status: "DRAFT",
      },
    });

    return NextResponse.json({ success: true, data: page }, { status: 201 });
  } catch (error) {
    console.error("Error creating page:", error);
    return NextResponse.json(
      { success: false, error: "创建页面失败" },
      { status: 500 }
    );
  }
}
