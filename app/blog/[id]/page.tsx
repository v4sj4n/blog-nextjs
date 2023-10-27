import { CaretLeft } from "@phosphor-icons/react/dist/ssr"

import Link from "next/link"

const getBlog = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/blogs/${id}`, {
    next: { revalidate: 5 },
  })
  const data = await res.json()
  return data?.blog
}
export default async function Blog({ params }: any) {
  const blog: Blog = await getBlog(params.id)
  console.log(blog)
  return (
    <>
      <Link
        href="/"
        className="mt-8 flex items-center gap-2 hover:underline text-lg mx-8"
      >
        <CaretLeft size={22} />
        <p>Go back to all blogs</p>
      </Link>
      <div className="mx-8 mt-2">
        <h1 className="text-6xl font-bold">{blog.title}</h1>
        <h3>{blog.content}</h3>
      </div>
    </>
  )
}
