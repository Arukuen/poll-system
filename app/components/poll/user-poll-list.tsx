'use client'
import { collection, getDocs, query, onSnapshot } from 'firebase/firestore'
import { useState, useEffect } from 'react';

import { User } from '@/app/page';
import { db } from '@/app/firebase';
import { Poll, PollListItem  } from './poll-list';
import Link from 'next/link';


export function UserPollList({
        user,
    }: {
        user: User
    }) {

    const [polls, setPolls] = useState<Poll[]>([]);

    useEffect(() => {
        const fetchedPolls: Poll[] = [];

        const q = query(collection(db, 'users', user.id, 'polls'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                fetchedPolls.push({
                    title: doc.data().title,
                    owner: user.name,
                    id: doc.id
                });
            });
        });
        setPolls(fetchedPolls);
    }, []);

    return (
        <div className='flex flex-col w-3/4'>
            <div className='flex flex-row justify-between items-center mb-4'>
                <h2 className='text-2xl'>Your polls</h2>
                <u><Link href='/public'>View public polls</Link></u>
            </div>
            {polls.map(({ id, title, owner }) => (
                <PollListItem id={id} title={title} owner={owner} key={id} />
            ))}
        </div>
    )
}