import React, { useContext, useState } from 'react'
import './share.css'
import PermMedia from '@mui/icons-material/PermMedia';
import Label from '@mui/icons-material/Label';
import Room from '@mui/icons-material/Room';
import EmojiEmotions from '@mui/icons-material/EmojiEmotions';
import { UserContext } from '../../UserContext';
import axios from 'axios';

const Share = () => {
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  const { currentUser } = useContext(UserContext);
  const [post, setPost] = useState({
    desc: "",
    img: "",
    userId: currentUser?._id || "",
  });

  const handleShare = async () => {
    try {
      const res = await axios.post("/api/posts", {
        userId: currentUser._id,
        desc: post.desc,
        img: "",
      });
      setPost({ ...post, desc: "" });
    } catch (error) {
      console.error("Error sharing post:", error);
    }
  };


  return (
    <div className='share'>
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={PF + currentUser.profilePicture} alt="" />
          <input
            placeholder="What's in your mind?"
            className="shareInput"
            value={post.desc}
            onChange={(e) => setPost({ ...post, desc: e.target.value })}
          />
        </div>
        <hr className='shareHr' />

        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <PermMedia htmlColor='tomato' className='shareIcon' />
              <span className="shareOptionText">Photo or Video</span>
            </div>
            <div className="shareOption">
              <Label htmlColor='blue' className='shareIcon' />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor='green' className='shareIcon' />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor='goldenrod' className='shareIcon' />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" onClick={handleShare}>Share</button>
        </div>
      </div>

    </div>
  )
}

export default Share
