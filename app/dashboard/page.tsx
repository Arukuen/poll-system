'use client'

import { doc, onSnapshot, setDoc, collection, query, deleteDoc } from 'firebase/firestore';
import { getAuth} from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { User, Poll } from '../types';
import { db } from '@/app/firebase';
import { PollListItem } from '../components/poll-list';
import CreatePollForm from '../components/create-poll-form';


export default function Dashboard() {
  const auth = getAuth();
  const [loggedUser, loading] = useAuthState(auth);
  const router = useRouter();
  const [polls, setPolls] = useState<Poll[]>([]);
  const [user, setUser] = useState<User>({id: '', name: '', photo: ''});

  // Initialization of user
  useEffect(() => {
    async function addUser(id: string, name: string, photo: string) {
      const userDoc = doc(db, 'users', id);
      await setDoc(userDoc, {
        name: name,
        photo: photo,
      });
    }
    
    if (loading)
    return;

    // If no user is logged, go back to login page
    if (!loggedUser) {
      router.push('/');
      return;
    }
    // Add user to database
    addUser(
      loggedUser.uid, 
      loggedUser.displayName || '', 
      loggedUser.photoURL || ''
    );

    // Set the user state for global usage
    setUser({
      id: loggedUser.uid,
      name: loggedUser.displayName || '',
      photo: loggedUser.photoURL || '',
    })
  }, [loggedUser, loading]);


  // Realtime display of polls 
  useEffect(() => {
    // Return when user is still not fetched
    if (user.id === '') return;

    // Reference to poll collection of the logged user
    const pollColl = collection(db, 'users', user.id, 'polls');

    // Realtime rendering every time database is updated
    const unsubscribe = onSnapshot(query(pollColl), (querySnapshot) => {
      const fetchedPolls: Poll[] = [];
      querySnapshot.forEach((doc) => {
        fetchedPolls.push({
          id: doc.id,
          title: doc.data().title,
        });
      });
      setPolls(fetchedPolls);
    });
  }, [user]);

  async function deletePoll(userId: string, pollId: string) {
    await deleteDoc(doc(db, 'users', userId, 'polls', pollId));
  }

  return (
    <div className='flex flex-col w-96 gap-10'>
      <div>
        <h2 className='text-2xl mb-4'>Create a Poll</h2>
        <CreatePollForm {...user} />
      </div>
      <div>
        <h2 className='text-2xl mb-4'>Your Current Polls</h2>
        <div>
          { polls.length > 0 
            ?
              polls.map(({ id, title }) => (
                <PollListItem userId={user.id} pollId={id} title={title} username={user.name} photo={user.photo} deletePoll={deletePoll} key={id} />
              ))
            :
            <p className='text-center'>No polls created yet...</p>
          }
        </div>
      </div>
    </div>
  )
}