import React, { useContext, useEffect, useState } from 'react'
import './sidebar.css'
import RssFeed from '@mui/icons-material/RssFeed';
import Chat from '@mui/icons-material/Chat';
import PlayCircleFilledOutlined from '@mui/icons-material/PlayCircleFilledOutlined';
import Group from '@mui/icons-material/Group';
import Bookmark from '@mui/icons-material/Bookmark';
import HelpOutline from '@mui/icons-material/HelpOutline';
import WorkOutline from '@mui/icons-material/WorkOutline';
import Event from '@mui/icons-material/Event';
import School from '@mui/icons-material/School';
import CloseFriend from '../closeFriend/CloseFriend';
import { UserContext } from '../../UserContext';
import axios from 'axios';

const Sidebar = () => {
  const { currentUser } = useContext(UserContext);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      if (currentUser.followings.length > 0) {
        try {
          const friendRequests = currentUser.followings.map(friendId =>
            axios.get('/api/users', { params: { userId: friendId } })
          );

          const responses = await Promise.all(friendRequests);
          const friendsData = responses.map(response => response.data);
          setFriends(friendsData);
        } catch (error) {
          console.error("Error fetching friends:", error);
        }
      }
    };

    fetchFriends();
  }, [currentUser.followings]);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className='sidebarButton'>Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {friends.map((friend) => (
            <CloseFriend key={friend._id} user={friend} />
          ))}

        </ul>
      </div>
    </div>
  )
}

export default Sidebar;
