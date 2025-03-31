import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Rightbar from '../../components/rightbar/Rightbar';
import Feed from '../../components/feed/Feed';
import './profile.css'
import axios from 'axios';


/*
<Rightbar profile /> boolean prop, is true if no initial value
prop: parent pass data to child, in child component can get it by:
1. const ChildComponent = (props) => {
  return <div>{props.message}</div>; };
2. const ChildComponent = ({ message }) => {
  return <div>{message}</div>; };
*/
const Profile = () => {
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;

  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/users?username=${username}`);
      console.log(res.data);
      setUser(res.data);
    }
    fetchUser();
  }, []);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img className="profileCoverImg" src={user.coverPicture || PF + "post/3.jpeg"} alt="" />
              <img className="profileUserImg" src={user.profilePicture || PF + "post/5.jpeg"} alt="" />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">Hello</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>

        </div>

      </div>
    </>
  )
}

export default Profile
