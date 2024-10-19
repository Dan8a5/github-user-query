import React from 'react'
import { useTransition, animated } from 'react-spring'
import UserCard from './UserCard'

function UserCardList({ users }) {
  const transitions = useTransition(users, {
    keys: user => user.id,
    from: { opacity: 0, transform: 'translate3d(0,40px,0)' },
    enter: { opacity: 1, transform: 'translate3d(0,0px,0)' },
    leave: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
  })

  if (users.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        No users to display. Try searching for a GitHub user!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {transitions((style, user) => (
        <animated.div style={style} key={user.id}>
          <UserCard user={user} />
        </animated.div>
      ))}
    </div>
  );
}

export default UserCardList;