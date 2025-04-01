import React, {useContext} from 'react'
import "./topbar.css"
import Search from '@mui/icons-material/Search';
import Person from '@mui/icons-material/Person';
import Chat from '@mui/icons-material/Chat';
import Notifications from '@mui/icons-material/Notifications';
import { Link } from 'react-router-dom';
import { UserContext } from '../../UserContext';

const Topbar = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div className='topbarContainer'>
      <div className="topbarLeft">
        <Link to='/' style={{ textDecoration: "none" }}>
          <span className="logo">Cherrysocial</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search />
          <input placeholder='Search for friend, post or video' className="searchInput" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>

          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>

          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>

        </div>
        <img src={currentUser.profilePicture} alt="" className="topbarImg" />
      </div>
    </div>
  )
}

export default Topbar
