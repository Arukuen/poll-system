import { Vote } from "../types"
export function VoteListItem({userId, name, photo, choiceIndex, choiceName}: Vote ) {    
    return (
    <li className='flex flex-row justify-between items-center border-white border-solid border-2 rounded-xl my-1 px-4 py-1'>
        <span className='font-bold'>{choiceName}</span>
        <span><img src={photo} alt={`Photo of ${name}`} className='w-8 rounded-full' /></span>
    </li>
    )
  }
  