import { collection, getDocs } from 'firebase/firestore'
import { db } from './firebase';

import { PollList } from './components/poll/poll-list';

export type User = {
  name: string,
  photo: string,
  id: string,
}

async function getUsers() {
  const users: User[] = []
  const querySnapshot = await getDocs(collection(db, 'users'));
  querySnapshot.forEach((doc) => {
    users.push({
      name: doc.data().name,
      photo: doc.data().photo,
      id: doc.id,
    })
  });
  return users;
}

export default async function Home() {
  const users = await getUsers();
  return (
    <main className='flex flex-col items-center p-6'>
      <PollList users={users} />
    </main>
  )
}
