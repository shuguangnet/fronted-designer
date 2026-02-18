import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { z } from "zod";

const updatePageSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  slug: z.string().optional(),
  description: z.string().optional(),
  content: z.record(z.any()).optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
  themeId: z.string().optional(),
});

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const page = await prisma.page.findUnique({
      where: { id },
      include: {
        author: { select: { id: true, name: true, email: true } },
        theme: true,
      },
    });

    if (!page) {
      return NextResponse.json(
        { success: false, error: "页面不存在" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        ...page,
        content: JSON.parse(page.content),
      },
    });
  } catch (error) {
    console.error("Error fetching page:", error);
    return NextResponse.json(
      { success: false, error: "获取页面失败" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "请先登录" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await req.json();

    // Validate input
    const validationResult = updatePageSchema.safeParse(body);
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

    // Check if page exists
    const existingPage = await prisma.page.findUnique({ where: { id } });
    if (!existingPage) {
      return NextResponse.json(
        { success: false, error: "页面不存在" },
        { status: 404 }
      );
    }

    // Check if user is owner or admin
    const userRole = (session.user as any).role;
    if (existingPage.authorId !== (session.user as any).id && userRole !== "ADMIN") {
      return NextResponse.json(
        { success: false, error: "无权修改此页面" },
        { status: 403 }
      );
    }

    const { title, slug, description, content, status, themeId } = validationResult.data;

    // Check if new slug conflicts with another page
    if (slug && slug !== existingPage.slug) {
      const conflict = await prisma.page.findUnique({ where: { slug } });
      if (conflict) {
        return NextResponse.json(
          { success: false, error: "该 URL 已被使用" },
          { status: 409 }
        );
      }
    }

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (slug !== undefined) updateData.slug = slug;
    if (description !== undefined) updateData.description = description;
    if (content !== undefined) updateData.content = JSON.stringify(content);
    if (status !== undefined) updateData.status = status;
    if (themeId !== undefined) updateData.themeId = themeId;
    if (status === "PUBLISHED" && !existingPage.publishedAt) {
      updateData.publishedAt = new Date();
    }

    const page = await prisma.page.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, data: page });
  } catch (error) {
    console.error("Error updating page:", error);
    return NextResponse.json(
      { success: false, error: "更新页面失败" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "请先登录" },
        { status: 401 }
      );
    }

    const { id } = await params;

    // Check if page exists
    const existingPage = await prisma.page.findUnique({ where: { id } });
    if (!existingPage) {
      return NextResponse.json(
        { success: false, error: "页面不存在" },
        { status: 404 }
      );
    }

    // Check if user is owner or admin
    const userRole = (session.user as any).role;
    if (existingPage.authorId !== (session.user as any).id && userRole !== "ADMIN") {
      return NextResponse.json(
        { success: false, error: "无权删除此页面" },
        { status: 403 }
      );
    }

    await prisma.page.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "页面已删除" });
  } catch (error) {
    console.error("Error deleting page:", error);
    return NextResponse.json(
      { success: false, error: "删除页面失败" },
      { status: 500 }
    );
  }
}
