'use client';

import { Button } from "@/components/ui/button"
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, LogOut, User, Settings, Plus } from "lucide-react"

import { useUser } from "@/components/context/AuthContext"


// Sample blog data
const blogPosts = [
  {
    id: "001",
    name: "My First Blog Post",
    views: 1250,
    status: "publicado" as const,
  },
  {
    id: "002",
    name: "Exploring the Mountains",
    views: 890,
    status: "publicado" as const,
  },
  {
    id: "003",
    name: "The Future of AI",
    views: 2340,
    status: "borrador" as const,
  },
  {
    id: "004",
    name: "Web Development Tips",
    views: 567,
    status: "esperando" as const,
  },
  {
    id: "005",
    name: "Photography Basics",
    views: 1890,
    status: "publicado" as const,
  },
  {
    id: "006",
    name: "Travel Adventures",
    views: 0,
    status: "borrador" as const,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "publicado":
      return "bg-green-100 text-green-800 hover:bg-green-100"
    case "borrador":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
    case "esperando":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100"
  }
}

export default function Dashboard() {

    const {user, setUser} = useUser();

    const handleLogOut =()=>{
        sessionStorage.removeItem('user_stored');
        setUser(undefined);
    }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 flex md:flex-row flex-col justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome again!, {user?.username}</h2>
            <p className="text-gray-600">Manage your blogs and check their performance</p>
          </div>
          <div className="flex flex-row align-baseline gap-4">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              <Link href="/dashboard/newBlog">Create new blog</Link>
            </Button>
            <Button variant="outline" className="ml-2" onClick={handleLogOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="ml-2 p-0 rounded-full">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={"#"} alt={user?.username || "User"} />
                            <AvatarFallback>
                                {user?.username ? user.username.charAt(0).toUpperCase() : <User className="h-5 w-5" />}
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        Configuración
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => {/* handle logout here */}}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Cerrar sesión
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Blogs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{blogPosts.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {blogPosts.reduce((sum, post) => sum + post.views, 0).toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {blogPosts.filter((post) => post.status === "publicado").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Blog Posts Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">My Blogs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-medium text-gray-900">Blog name</TableHead>
                    <TableHead className="font-medium text-gray-900">ID</TableHead>
                    <TableHead className="font-medium text-gray-900">Views</TableHead>
                    <TableHead className="font-medium text-gray-900">State</TableHead>
                    <TableHead className="font-medium text-gray-900 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blogPosts.map((post) => (
                    <TableRow key={post.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium text-gray-900">{post.name}</TableCell>
                      <TableCell className="text-gray-600">#{post.id}</TableCell>
                      <TableCell className="text-gray-600">{post.views.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={getStatusColor(post.status)}>
                          {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                          <Edit className="h-4 w-4 text-gray-600" />
                          <span className="sr-only">Editar blog</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
    </main>
  )
}
