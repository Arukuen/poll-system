import Link from 'next/link';

export function PollListItem({userId, pollId, title, username, photo}: {userId: string, pollId:string, title: string, username: string, photo: string} ) {    
  return (
    <Link href={`/dashboard/poll/${userId}/${pollId}`}>
      <li className='flex flex-row justify-between items-center border-white border-solid border-2 rounded-xl my-1 px-4 py-1'>
        <span className='font-bold'>{title}</span>
        <span><img src={photo} alt={`Photo of ${username}`} className='w-8 rounded-full' /></span>
      </li>
    </Link>
  )
}

