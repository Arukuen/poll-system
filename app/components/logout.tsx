'use client'

import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { app } from '../firebase';


export default function Logout() {
  const auth = getAuth(app);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  
  if (loading) 
    return <div className='border-solid border-white rounded-xl border-2 p-2 mx-2'>Logging in...</div>;

  if (!user) {
    router.push('/');
    <div>Sign in to continue.</div>;
  }

  return (
    <button className='border-solid border-white rounded-xl border-2 p-2 mx-2' onClick={() => auth.signOut()}>Logout</button>
  )
}