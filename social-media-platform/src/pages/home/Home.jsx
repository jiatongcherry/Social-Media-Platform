import React, { useContext, useEffect } from 'react'
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Rightbar from '../../components/rightbar/Rightbar';
import Feed from '../../components/feed/Feed';
import './home.css'
import { UserContext } from '../../UserContext';
import { useNavigate } from 'react-router-dom'; //for routing

const Home = () => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (currentUser === null) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  //prevent rendering if there is no user
  if (currentUser === null) {
    return null;
  }

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed username={currentUser.username} />
        <Rightbar />
      </div>
    </>
  )
}

export default Home;