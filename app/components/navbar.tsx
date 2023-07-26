import { Component, ReactComponentElement, ReactNode } from "react"
import Logout from "./logout"
import Link from "next/link"

export default function NavBar() {
  return (
    <nav className='flex flex-row justify-between items-center w-ful h-fit py-4 px-6'>
      <h1 className='text-3xl font-extrabold'>Poll System</h1>
      <div className='flex flex-row w-60 items-center justify-between'>
        <u><Link href='/dashboard'>Home</Link></u>
        <u><Link href='/dashboard/polls'>Polls</Link></u>
        <Logout />
      </div>
    </nav>
  )
}