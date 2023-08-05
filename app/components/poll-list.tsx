import Link from 'next/link';

export function PollListItem({userId, pollId, title, username, photo, deletePoll=null}: {userId: string, pollId:string, title: string, username: string, photo: string, deletePoll: Function | null} ) {    
  return (
    
      <li className='flex flex-row justify-between items-center border-white border-solid border-2 rounded-xl my-1 px-4 py-1'>
        <Link href={`/dashboard/poll/${userId}/${pollId}`}>
        <span className='font-bold'>{title}</span>
        </Link>
        <span className='flex flex-row gap-4 items-center'>
          <img src={photo} alt={`Photo of ${username}`} className='w-8 rounded-full' />
          {deletePoll !== null
          ? 
            <button className='text-red-600 text-2xl' onClick={() => deletePoll(userId=userId, pollId=pollId)}>X</button>
          :
            null
          }
        </span>
      </li>
    )

}

