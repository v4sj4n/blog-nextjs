import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
export const GET = async (req: Request) => {
  try {
    const blogs = await prisma.blog.findMany()
    return NextResponse.json(
      { message: "OK", blogs },
      {
        status: 200,
      }
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error },
      {
        status: 500,
      }
    )
  }
}

export const POST = async (req: Request) => {
  const { title, content } = await req.json()
  try {
    await prisma.blog.create({
      data: {
        title,
        content,
      },
    })
    return NextResponse.json(
      { message: "OK", post: { title, content } },
      {
        status: 201,
      }
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error },
      {
        status: 500,
      }
    )
  }
}
