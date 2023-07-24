import { UserPollList } from './components/poll/user-poll-list'

export type User = {
  id: string,
  name: string,
  photo: string,
}

export default function Home() {
  let user: User = {
    'name': 'Alquen',
    'photo': 'url',
    'id': 'GG6H8l7e84jnVqpDo8UO',
  }
  return (
    <main className='flex flex-col items-center p-6'>
      <UserPollList user={user} />
    </main>
  )
}
