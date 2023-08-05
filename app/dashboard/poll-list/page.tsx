import { getDocs, collection, query } from 'firebase/firestore';

import { db } from '@/app/firebase';
import { PollListItem } from '@/app/components/poll-list';
import { User } from '@/app/types';


async function fetchAllPolls() {
	const users: User[] = [];

	const userQuery = query(collection(db, 'users'));
	const userSnapshot = await getDocs(userQuery);
	userSnapshot.forEach((doc) => {
		users.push({
			id: doc.id,
			name: doc.data().name,
			photo: doc.data().photo,
			polls: [],
		});
	});

	for (const user of users) {
		const pollQuery = query(collection(db, 'users', user.id, 'polls'));
		const pollSnapshot = await getDocs(pollQuery);
		pollSnapshot.forEach((doc) => {
			if (!user.polls) return;
			user.polls.push({
				id: doc.id,
				title: doc.data().title
			})
		});
	}
	
	return users;
}

export default async function Polls() {
	const users = await fetchAllPolls();

	return (
		<div className='flex flex-col w-96'>
			<h2 className='text-2xl mb-4'>All Polls</h2>
			<div>
				{users.length > 0 
				?
					users.map(({ id, name, photo, polls }) => (
						polls 
						? 
							polls.map((poll) => (
								<PollListItem userId={id} pollId={poll.id} title={poll.title} username={name} photo ={photo} deletePoll={null} key={id} />
							))
						:
							null
					))
				:
					<p className='text-center'>No polls created yet...</p>
				}
			</div>
		</div>
	)
}