"use client"

import { FormEvent, useState } from "react"
import { Blog } from "@/components/Blog"

export default function Search() {
  const [searchPhrase, setSearchPhrase] = useState<string>("")
  const [blogArray, setBlogArray] = useState<Blog[]>([])
  const searchNote = async (e: FormEvent) => {
    e.preventDefault()
    const res = await fetch(
      `http://localhost:3000/api/blogs/search/${searchPhrase}`,
      {
        next: {
          revalidate: 5,
        },
      }
    )
    const data = await res.json()
    setSearchPhrase("")
    setBlogArray(data.blogs)
  }
  return (
    <div>
      <h1 className="text-center text-4xl font-bold mt-8 mb-4">Search</h1>
      <form onSubmit={searchNote} className="flex flex-col items-center">
        <input
          className="rounded-lg p-3 mb-2 text-zinc-800 outline-none "
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            setSearchPhrase(e.target.value)
          }}
        />
        <button
          type="submit"
          className="bg-zinc-50 text-zinc-800 px-20 py-2 rounded-md mt-2"
        >
          submit
        </button>
      </form>

      <div className="flex mt-6 gap-6 flex-wrap justify-center">
        {blogArray?.map((blog: Blog) => {
          return <Blog key={String(blog.id)} blog={blog} />
        })}
      </div>
    </div>
  )
}
