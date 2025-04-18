import React from 'react'
import './closefriend.css'

const CloseFriend = ({ user }) => {
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;

  return (
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={PF + user.profilePicture} alt="" />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  )
}

export default CloseFriend
