"use client"

import { redirect } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"

export default function PageToEdit({ params }: any) {
  const [editedTitle, setEditedTitle] = useState<string>("")
  const [editedContent, setEditedContent] = useState<string>("")
  const [edited, setEdited] = useState<boolean>(false)
  useEffect(() => {
    const getBlog = async () => {
      const res = await fetch(`http://localhost:3000/api/blogs/${params.id}`)
      const data = await res.json()
      setEditedTitle(data?.blog.title)
      setEditedContent(data?.blog.content)
    }
    getBlog()
  }, [])

  const editBlog = async (e: FormEvent) => {
    e.preventDefault()
    await fetch(`http://localhost:3000/api/blogs/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: editedTitle, content: editedContent }),
    })
    setEdited(true)
  }

  useEffect(() => {
    if (edited) {
      redirect("/blog/" + params.id)
    }
  })
  return (
    <div>
      <form onSubmit={editBlog} className="mt-8 flex flex-col items-center">
        <h3 className="text-4xl font-bold mb-8">Create a blog post</h3>
        <input
          className="rounded-lg p-3 mb-2 text-zinc-800 outline-none "
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
        />
        <textarea
          className="rounded-lg p-3 text-zinc-800 outline-none"
          value={editedContent}
          placeholder="Content"
          onChange={(e) => setEditedContent(e.target.value)}
        />
        <button
          className="bg-zinc-50 text-zinc-800 px-20 py-2 rounded-md mt-2"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  )
}
