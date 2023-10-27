import { Blog } from "@/components/Blog"

async function getBlogs() {
  const res = await fetch("http://localhost:3000/api/blogs", {
    cache: "no-store",
    next: { revalidate: 5 },
  })
  const data = await res.json()
  return data?.blogs
}
export default async function Home() {
  const blogs = await getBlogs()

  return (
    <>
      <div className="mx-8 ">
        <h1 className="text-5xl flex-grow block">Blog posts</h1>

        <div className="flex mt-6 gap-6 flex-wrap">
          {blogs?.map((blog: Blog) => {
            return <Blog key={String(blog.id)} blog={blog} />
          })}
        </div>
      </div>
    </>
  )
}


