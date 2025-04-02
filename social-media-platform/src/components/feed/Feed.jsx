import React, { useState, useEffect } from 'react'
import './feed.css'
import Share from '../share/Share'
import Post from '../post/Post'
import axios from 'axios'

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('/api/posts/profile/' + username);
      setPosts(res.data);
    }
    fetchPosts();
  }, [username]);

  return (
    <div className='feed'>
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  )
}

export default Feed;
