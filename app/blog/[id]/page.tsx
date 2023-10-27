import { CaretLeft } from "@phosphor-icons/react/dist/ssr/CaretLeft"
import { PencilSimple } from "@phosphor-icons/react/dist/ssr/PencilSimple"

import Link from "next/link"

const getBlog = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/blogs/${id}`, {
    cache: "no-store",
    next: { revalidate: 5 },
  })
  const data = await res.json()
  return data?.blog
}
export default async function Blog({ params }: any) {
  const blog: Blog = await getBlog(params.id)
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

      <Link
        href={`/blog/edit/${params.id}`}
        className="mt-8 flex items-center gap-2 hover:underline text-lg mx-8"
      >
        <PencilSimple size={22} />
        <p>Edit</p>
      </Link>
    </>
  )
}
