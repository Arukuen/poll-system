export default function NavBar() {
    return (
      <nav className='flex flex-row justify-between w-full align-middle h-fit px-6 py-4'>
        <h1 className='text-3xl font-extrabold'>Poll System</h1>
        <button className='border-solid border-white rounded-xl border-2 p-2'>Create a Poll</button>
      </nav>
    )
}