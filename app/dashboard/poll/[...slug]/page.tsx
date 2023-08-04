'use client'

import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc, getDoc, addDoc, query, collection } from 'firebase/firestore';
import { getAuth} from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { db } from '@/app/firebase';
import { Poll, Vote, User } from '@/app/types';
import { VoteListItem } from '@/app/components/vote-list';

export default function Page({ params }: { params: { slug: string[] } }) {
  const auth = getAuth();
  const router = useRouter();
  const [loggedUser, loading] = useAuthState(auth)

  const [user, setUser] = useState<User>({id: '', name: '', photo: ''});
  const [choiceIndex, setChoiceIndex] = useState<number>()
  const [poll, setPoll] = useState<Poll>()
  const [votes, setVotes] = useState<Vote[]>([])
  const ownerId = params.slug[0];
  const pollId = params.slug[1];

  useEffect(() => {
    if (loading) 
      return;

    // If no user is logged, go back to login page
    if (!loggedUser) {
      router.push('/');
      return;
    }
    console.log('user useeffect')

    // Set the user state for global usage
    setUser({
      id: loggedUser.uid,
      name: loggedUser.displayName || '',
      photo: loggedUser.photoURL || '',
    })
  }, [loggedUser]);


  useEffect(() => {
    const pollDoc = doc(db, 'users', ownerId, 'polls', pollId);
    const unsubscribe = onSnapshot(pollDoc, (querySnapshot) => {
      const data = querySnapshot.data();
      if (!data) return;
      setPoll({
        id: pollId,
        title: data.title,
        question: data.question,
        choices: data.choices
      });
    });
  }, []);

  useEffect(() => {
    const votesColl = collection(db, 'users', ownerId, 'polls', pollId, 'votes');
    
    const unsubscribe = onSnapshot(query(votesColl), (querySnapshot) => {
      const votesList: Vote[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        votesList.push({
          userId: doc.id,
          name: data.name,
          photo: data.photo,
          choiceIndex: data.choiceIndex
        })
      });
      setVotes(votesList);
      console.log(votesList);
    });
  }, [user]);

  async function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!choiceIndex) {
      alert('Please choose an option.');
      return;
    }
    const voteRef = doc(db, 'users', ownerId, 'polls', pollId, 'votes', user.id);
    await setDoc(voteRef, {
      name: user.name,
      photo: user.photo,
      choiceIndex: choiceIndex
    });
    setChoiceIndex(undefined);
    console.log('sent');
  }


  return (
    <div className='flex flex-col w-96 gap-10'>
      <div>
        <h2 className='text-2xl mb-4'>{poll?.title}</h2>
        <p className='text-center mb-2'>{poll?.question}</p>
        <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
          <div className='grid grid-cols-2 gap-3 mt-1 mb-3'>
          {poll?.choices
          ? poll?.choices.map((choice: string, index: number) => (
            <div key={choice}>
              <input type='radio' name='choice' id={index.toString()} value={index.toString()} checked={choiceIndex === index} onChange={() => setChoiceIndex(index)} className='hidden peer' />
              <label className='block text-center w-full py-1 px-2 bg-black border-white border-solid border-2 rounded-lg peer-checked:bg-gray-700 peer-checked:font-bold cursor-pointer hover:bg-gray-900' htmlFor={index.toString()}>{choice}</label>
            </div>
          ))
          :
            null
          }
          </div>
          <button className='bg-white text-black hover:bg-slate-200 font-semibold rounded-xl px-2 py-1' type='submit'>Vote</button>
        </form>
      </div>
      <div>
        <h2 className='text-2xl mb-4'>Vote List</h2>
        <div className='flex flex-col'>
          {votes.length > 0 
          ?
            poll?.choices
            ?
              votes.map((vote) => (
                <VoteListItem {...vote} choiceName={poll.choices ? poll?.choices[vote.choiceIndex] : ''} key={vote.userId} />
              ))
            :
              null
          :
            <p className='text-center'>No votes yet...</p>
          }
        </div>
      </div>
		</div>
  );
}