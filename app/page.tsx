import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PenTool, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function BlogPlatform() {
  const blogPosts = [
    {
      title: "My First Blog Post",
      author: "John Doe",
      date: "April 22, 2024",
      excerpt: "Lorem ipsum dolor sit amet, consectetur-adipiscing elit...",
    },
    {
      title: "Exploring the Mountains",
      author: "John Doe",
      date: "Lorem ipsum dolor sit",
      excerpt: "amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet.",
    },
    {
      title: "The Future of AI",
      author: "John Doe",
      date: "Aletrauls rus",
      excerpt: "Lorem ipsum dolor sit amit, et. consectetur adipiscing elit.",
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <div className="space-y-8 md:flex md:flex-row md:justify-between">
          <div className="space-y-4 md:flex md:flex-col md:gap-4 md:my-auto">
            <h1 className="text-center mx-auto text-7xl md:text-left md:text-5xl lg:text-9xl font-bold text-gray-900 leading-tight" style={{ fontFamily: "Times New Roman, Times, serif" }}>
              Blog Page
            </h1>
            <div className="flex flex-col gap-8">
              <p className="text-center mx-auto md:mx-1 text-xl text-gray-600 max-w-md">
                A modern platform for creating and reading blogs
              </p>
              <div className="flex justify-center md:justify-start">
                <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 w-1/2 rounded-full text-lg">
                  Create Blog
                </Button>
              </div>
            </div>
          </div>


          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Blue circle with pen icon */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center z-10">
                <PenTool className="w-8 h-8 text-white" />
              </div>
              {/* Hand writing illustration */}
              <div className="w-150 h-150 bg-gray-50 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 300 300" className="w-300 h-100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Paper lines */}
                  <rect x="50" y="80" width="200" height="140" fill="white" stroke="#e5e7eb" strokeWidth="2" rx="8" />
                  <line x1="70" y1="100" x2="230" y2="100" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="70" y1="120" x2="230" y2="120" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="70" y1="140" x2="230" y2="140" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="70" y1="160" x2="230" y2="160" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="70" y1="180" x2="230" y2="180" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="70" y1="200" x2="230" y2="200" stroke="#e5e7eb" strokeWidth="1" />

                  {/* Hand holding pen */}
                  <path d="M180 60 L200 80 L190 90 L170 70 Z" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1" />
                  <path d="M200 80 L220 100 L210 110 L190 90 Z" fill="#fde68a" stroke="#f59e0b" strokeWidth="1" />
                  <line x1="220" y1="100" x2="240" y2="120" stroke="#374151" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="242" cy="122" r="2" fill="#374151" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {blogPosts.map((post, index) => (
            <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{post.author}</span>
                  <span className="mx-2">•</span>
                  <span>{post.date}</span>
                </div>
                <p className="text-gray-600 leading-relaxed">{post.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-end">
          <Link href="/blog" className="flex items-center text-gray-900 hover:text-gray-600 font-medium">
            View all
            <ChevronRight className="w-5 h-5 ml-1" />
          </Link>
        </div>
      </section>
    </>
  )
}