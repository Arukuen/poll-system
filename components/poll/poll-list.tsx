type Poll = {
    title: string,
    owner: string,
}

let pollList = [
    {'name': 'Poll 1', 'owner': 'Alquen'},
    {'name': 'Poll 2', 'owner': 'Diabeto'},
]

export function PollList() {
    let polls = []

    for(let poll of pollList) {
        polls.push(<PollListItem title={poll.name} owner={poll.owner} />)
    }

    return (
        <div className='flex flex-col w-3/4'>
            <h2 className='text-2xl mb-4'>Poll List</h2>
            {polls}
        </div>
    )
}

export function PollListItem({ title, owner}: Poll ) {    
    return (
        <li className='flex flex-row justify-between border-white border-solid border-2 rounded-xl my-1 px-3 py-2'>
            <span>{title}</span>
            <span>{owner}</span>
        </li>
    )
}