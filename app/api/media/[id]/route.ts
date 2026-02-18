import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { unlink } from "fs/promises";
import { join } from "path";

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

    const media = await prisma.media.findUnique({ where: { id } });
    if (!media) {
      return NextResponse.json(
        { success: false, error: "文件不存在" },
        { status: 404 }
      );
    }

    // Delete file from filesystem
    const filepath = join(process.cwd(), "public", "uploads", media.filename);
    try {
      await unlink(filepath);
    } catch {
      // File might not exist, continue with database deletion
    }

    // Delete from database
    await prisma.media.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      message: "文件已删除",
    });
  } catch (error) {
    console.error("Error deleting media:", error);
    return NextResponse.json(
      { success: false, error: "删除文件失败" },
      { status: 500 }
    );
  }
}
