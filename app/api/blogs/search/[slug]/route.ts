import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export const GET = async (req: Request) => {
  const slug = req.url.split("search/")[1]
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        OR: [
          {
            title: {
              mode: "insensitive",
              contains: slug,
            },
          },
          {
            content: {
              mode: "insensitive",
              contains: slug,
            },
          },
        ],
      },
    })
    if (!blogs) {
      return NextResponse.json({ message: "Not Found", slug }, { status: 404 })
    }
    return NextResponse.json({ message: "OK", blogs }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error },
      {
        status: 500,
      }
    )
  }
}
