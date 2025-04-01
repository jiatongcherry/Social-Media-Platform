import React, { useState, useEffect } from 'react'
import './post.css'
import MoreVert from '@mui/icons-material/MoreVert';
import axios from 'axios';
import { format } from "timeago.js";
import { Link } from 'react-router-dom';
/*
Redux: Context state container, store info of currentuser, other components can access it
useContext: use props to pass down info from parent to child by layer
but redux can directly pass data to any components
*/
const Post = ({ post }) => {

  /*
  don't use dummyData, fetch users from db using useEffect according to post
  const user = Users.filter((u) => u.id === post.userId)[0];
  */
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/users?userId=${post.userId}`);
      setUser(res.data);
    }
    fetchUser();
  }, [post.userId]);


  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  }

  //<Link> is used for routing
  return (
    <div className='post'>
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img className="postProfileImg" src={user.profilePicture} alt="" />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img src={PF + post.img} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={`${PF}like.png`} onClick={likeHandler} alt="" />
            <img className="likeIcon" src={`${PF}heart.png`} onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
