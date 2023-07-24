'use client';

import { app } from './firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';

export default function Home() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  if (loading) 
    return <div>Loading...</div>;
  
  if (user)
    router.push('/dashboard');

  async function signIn() {
    const res = await signInWithPopup(auth, provider);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 font-mono">
      <div className="z-10 w-full max-w-5xl items-center justify-between lg:w-3/5 text-center">
        <h1 className="text-3xl font-extrabold text-center">Poll System</h1>
        <button className="bg-slate-300 text-black rounded-md p-3 m-10 text-base" onClick={signIn}>Sign In With Google</button>
      </div>
    </main>
  )
}
