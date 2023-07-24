'use client'

import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { app } from '../firebase';

export default function NavBar() {
  const auth = getAuth(app);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  
  if (loading) 
  return <div>Loading...</div>;

  if (!user) {
    router.push('/');
    <div>Sign in to continue.</div>;
  }

  return (
    <nav className='flex flex-row justify-between items-center w-ful h-fit py-4 px-6'>
      <h1 className='text-3xl font-extrabold'>Poll System</h1>
      <div className='flex flex-row w-fit'>
        <button className='border-solid border-white rounded-xl border-2 p-2 mx-2'>Create a Poll</button>
        <button className='border-solid border-white rounded-xl border-2 p-2 mx-2' onClick={() => auth.signOut()}>Logout</button>
      </div>
    </nav>
  )
}