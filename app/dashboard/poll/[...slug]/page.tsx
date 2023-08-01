'use client'

import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc, getDoc, addDoc, query, collection } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { Poll } from '@/app/types';

async function fetchPoll(userId: string, pollId: string) {
  let poll: Poll;
  const pollRef = doc(db, 'users', userId, 'polls', pollId);
  const pollSnap = await getDoc(pollRef);

  const data = pollSnap.data();
  if (!data) return;

  poll = {
    id: pollId,
    title: data.title,
    question: data.question,
    choices: data.choices
  }

  return poll;
}

export default function Page({ params }: { params: { slug: string[] } }) {
  const [choiceIndex, setChoiceIndex] = useState<number>()
  const [poll, setPoll] = useState<Poll>()
  const userId = params.slug[0];
  const pollId = params.slug[1];

  useEffect(() => {
    const pollColl = doc(db, 'users', userId, 'polls', pollId);

    const unsubscribe = onSnapshot(pollColl, (querySnapshot) => {
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

  async function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const voteRef = doc(db, 'users', userId, 'polls', pollId, 'votes', userId);
    await setDoc(voteRef, {
      choiceIndex: choiceIndex
    });
    setChoiceIndex(undefined);
    console.log('test');
  }


  return (
    <div className='flex flex-col w-96 gap-3'>
			<h2 className='text-2xl'>{poll?.title}</h2>
			<p className='text-center text text-lg'>{poll?.question}</p>
      <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
        <div className='grid grid-cols-2 gap-3 mt-1 mb-3'>

        {poll?.choices
        ? poll?.choices.map((choice: string, index: number) => (
          <div key={index}>
            <input key={index} type='radio' name='choice' id={index.toString()} value={index.toString()} checked={choiceIndex === index} onChange={() => setChoiceIndex(index)} className='hidden peer' />
            <label className='block text-center w-full py-1 px-2 bg-black border-white border-solid border-2 rounded-lg peer-checked:bg-gray-700 peer-checked:font-bold cursor-pointer hover:bg-gray-900' htmlFor={index.toString()}>{choice}</label>
          </div>
        ))
        :
          null
        }
        </div>
        <button className='bg-white text-black font-semibold rounded-xl px-2 py-1 hover:bg-slate-300' type='submit'>Vote</button>
      </form>
		</div>
  );
}