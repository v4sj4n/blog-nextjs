import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import "./globals.css"
import Link from "next/link"

const dmSans = DM_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Blog App",
  description: "My blog app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        <nav className="flex justify-center">
          <Link className="p-8 text-2xl" href="/">
            Blogs
          </Link>
          <Link className="p-8 text-2xl" href="/blog/create">
            Create
          </Link>
          <Link className="p-8 text-2xl" href="/search">
            Search
          </Link>
        </nav>
        {children}
      </body>
    </html>
  )
}
