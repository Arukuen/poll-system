'use client';

import { app } from './firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Login() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user)
      router.push('/dashboard');
  }, [user])

  if (loading) 
    return <div className='text-center text-4xl'>Loading...</div>;
    
  async function signIn() {
    try {
      const res = await signInWithPopup(auth, provider);
    }
    catch {
      return <div className='text-center text-4xl'>Reload the page</div>;
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="w-full items-center justify-between text-center">
        <h1 className="text-3xl font-extrabold text-center">Poll System</h1>
        <button className="bg-white text-black hover:bg-slate-200 rounded-md p-3 m-10 text-base font-semibold " onClick={signIn}>Sign In With Google</button>
      </div>
    </main>
  )
}
