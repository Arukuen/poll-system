'use client'

import { collection, getDocs, query, onSnapshot } from 'firebase/firestore'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { db } from '@/app/firebase';
import { PollListItem, Poll } from '../components/poll-list';
import Link from 'next/link';


export type User = {
  id: string,
  name: string,
  photo: string,
}

export default function Dashboard() {
  const auth = getAuth();
  const [logged_user, loading] = useAuthState(auth);
  const router = useRouter();

  const [polls, setPolls] = useState<Poll[]>([]);


  useEffect(() => {
    
    if (loading) 
      return;
    
    if (!logged_user) {
      router.push('/');
      return;
    }

    let user: User = {
      'id': logged_user.uid,
      'name': logged_user.displayName || '',
      'photo': logged_user.photoURL || '',
    }

    

    const fetchedPolls: Poll[] = [];
    const q = query(collection(db, 'users', user.id, 'polls'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        fetchedPolls.push({
          title: doc.data().title,
          owner: user.name,
          id: doc.id
        });
      });
      setPolls(fetchedPolls);
    });
    
  }, [logged_user]);

  return (
    <div className='flex flex-col w-3/4'>
      <div className='flex flex-row justify-between items-center mb-4'>
        <h2 className='text-2xl'>Your polls</h2>
        <u><Link href='/public'>View public polls</Link></u>
      </div>
      {polls.map(({ id, title, owner }) => (
        <PollListItem id={id} title={title} owner={owner} key={id} />
      ))}
    </div>
  )
}