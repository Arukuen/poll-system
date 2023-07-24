export default function NavBar() {
    return (
      <nav className='flex flex-row justify-between items-center w-ful h-fit py-4 px-6'>
        <h1 className='text-3xl font-extrabold'>Poll System</h1>
        <div className='flex flex-row w-fit'>
          <button className='border-solid border-white rounded-xl border-2 p-2 mx-2'>Create a Poll</button>
          <button className='border-solid border-white rounded-xl border-2 p-2 mx-2'>Logout</button>
        </div>
      </nav>
    )
}