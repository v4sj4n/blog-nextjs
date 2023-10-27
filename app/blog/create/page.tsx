"use client"

import { FormEvent, useEffect, useState } from "react"
import { redirect } from "next/navigation"

export default function CreatePage() {
  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [created, setCreated] = useState<boolean>(false)
  const createBlog = async (e: FormEvent) => {
    e.preventDefault()
    await fetch("http://localhost:3000/api/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    })
    setCreated(true)
  }
  useEffect(() => {
    if (created) {
      redirect("/")
    }
  })
  return (
    <form onSubmit={createBlog} className="mt-8 flex flex-col items-center">
      <h3 className="text-4xl font-bold mb-8">Create a blog post</h3>
      <input
        className="rounded-lg p-3 mb-2 text-zinc-800 outline-none "
        type="text"
        value={title}
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="rounded-lg p-3 text-zinc-800 outline-none"
        value={content}
        placeholder="Content"
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        className="bg-zinc-50 text-zinc-800 px-20 py-2 rounded-md mt-2"
        type="submit"
      >
        Submit
      </button>
    </form>
  )
}
