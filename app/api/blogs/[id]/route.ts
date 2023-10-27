import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
export const GET = async (req: Request) => {
  const id = req.url.split("blogs/")[1]
  try {
    const blog = await prisma.blog.findUnique({
      where: {
        id: Number(id),
      },
    })
    if (!blog) {
      return NextResponse.json({ message: "Not Found", id }, { status: 404 })
    }
    return NextResponse.json({ message: "OK", blog }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error },
      {
        status: 500,
      }
    )
  }
}

export const PUT = async (req: Request) => {
  const id = req.url.split("blogs/")[1]
  try {
    const blogToChange = await prisma.blog.findUnique({
      where: {
        id: Number(id),
      },
    })
    if (!blogToChange) {
      return NextResponse.json({ message: "Not Found", id }, { status: 404 })
    }
    const { title, content } = await req.json()
    await prisma.blog.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        content,
      },
    })
    return NextResponse.json(
      { message: "Updated succesfully", blog: { id, title, content } },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 })
  }
}

export const DELETE = async (req: Request) => {
  const id = req.url.split("blogs/")[1]
  try {
    const postToDelete = await prisma.blog.findUnique({
      where: {
        id: Number(id),
      },
    })
    if (!postToDelete) {
      return NextResponse.json({ message: "Not Found", id }, { status: 404 })
    }
    await prisma.blog.delete({
      where: {
        id: Number(id),
      },
    })
    return NextResponse.json(
      { message: "Deleted ", postToDelete },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 })
  }
}
