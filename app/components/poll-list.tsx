export type Poll = {
  id: string,
  title: string,
  owner: string,
}
export function PollListItem({ id, title, owner}: Poll ) {    
  return (
    <li className='flex flex-row justify-between border-white border-solid border-2 rounded-xl my-1 px-3 py-2'>
      <span className='font-bold'>{title}</span>
      <span>by {owner}</span>
    </li>
)
}

export function PublicPollList() {

}


