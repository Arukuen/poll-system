import { Component, ReactComponentElement, ReactNode } from "react"
import Logout from "./logout"
import Link from "next/link"

export default function NavBar() {
  return (
    <nav className='flex flex-row justify-between items-center w-ful h-fit py-4 px-6'>
      <Link href='/dashboard'><h1 className='text-3xl font-extrabold'>Poll System</h1></Link>
      <div className='flex flex-row w-60 items-center justify-between'>
        <u><Link href='/dashboard'>Home</Link></u>
        <u><a href='/dashboard/poll-list'>Polls</a></u>
        <Logout />
      </div>
    </nav>
  )
}