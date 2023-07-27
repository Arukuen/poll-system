import { useState } from 'react';
import { doc, onSnapshot, setDoc, getDoc, addDoc, arrayUnion, collection } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { User } from '../dashboard/page';

export default function CreatePollForm(user: User) {
  let [title, setTitle] = useState('');
  let [choices, setChoices] = useState(['', '']);

  function handleChoiceChange(index: number, event: React.ChangeEvent<HTMLInputElement>) {
    let newData = [...choices];
    newData[index] = event.target.value;
    setChoices((newData));
  }

  function addChoice() {
    setChoices([...choices, '']);
  }

  function reduceChoice() {
    if (choices.length <= 2) return;
    let newData = [...choices];
    newData.pop();
    setChoices(newData);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const userRef = collection(db, 'users', user.id, 'polls');

    await addDoc(userRef, {
      title: title,
      choices: choices
    });

    setTitle('');
    setChoices(['', '']);
    console.log(title);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col gap-2 items-center'>
        <input name='title' placeholder='Title' className='w-full py-1 px-2 bg-black border-white border-solid border-2 rounded-lg' value={title} onChange={(event) => setTitle(event.target.value)} />

        <div className='flex flex-row items-center mt-3'>
          <span>Choices: </span>
          <button className='border-solid border-white rounded-lg border-2 px-2 mx-2' type='button' onClick={reduceChoice}>-</button>
          <span>{choices.length}</span>
          <button className='border-solid border-white rounded-lg border-2 px-2 mx-2' type='button' onClick={addChoice}>+</button>
        </div>
        <div className='grid grid-cols-2 gap-3 mt-1 mb-3'>
          {choices.map((choice: string, index: number) => {
            return (
              <div key={index}>
                <input
                  type='text'
                  name='choice'
                  placeholder={`Choice ${index + 1}`}
                  className='w-full py-1 px-2 bg-black border-white border-solid border-2 rounded-lg'
                  value={choice}
                  onChange={event => handleChoiceChange(index, event)}
                />
              </div>
            )
          })}
        </div>
        <button className='bg-white text-black font-semibold rounded-xl px-2 py-1 mx-2 hover:bg-slate-200' type='submit'>Submit</button>
      </div>
    </form>
  )
}