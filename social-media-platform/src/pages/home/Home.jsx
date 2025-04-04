import React, {useContext} from 'react'
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Rightbar from '../../components/rightbar/Rightbar';
import Feed from '../../components/feed/Feed';
import './home.css'
import { UserContext } from '../../UserContext';

const Home = () => {
  const { currentUser } = useContext(UserContext);
  // const allUsernames = [
  //   currentUser.username,
  //   ...(currentUser.followings?.map(user => user.username) || [])
  // ];

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed username = {currentUser.username}/>
        <Rightbar />
      </div>
    </>
  )
}

export default Home;