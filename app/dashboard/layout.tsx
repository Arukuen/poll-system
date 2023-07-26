import NavBar from "../components/navbar"

export default function NavLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <>
        <NavBar />
        <hr className='border-gray-500 mb-10' />
        <main className='flex flex-column justify-center'>
            {children}
        </main>
      </>
    )
  }
  