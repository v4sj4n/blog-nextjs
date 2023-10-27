import Link from "next/link"

export const Blog = ({ blog }: { blog: Blog }) => {
  return (
    <Link href={`/blog/${blog.id}`}>
      <div className="flex flex-col border border-zinc-50	p-8 rounded-md w-72">
        <h1 className="text-2xl">{blog.title}</h1>
        <p className="truncate">{blog.content}</p>
      </div>
    </Link>
  )
}
