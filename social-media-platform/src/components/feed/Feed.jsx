import React, { useState, useEffect } from 'react'
import './feed.css'
import Share from '../share/Share'
import Post from '../post/Post'
import axios from 'axios'

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get('/api/posts/profile/' + username)
        : await axios.get('/api/posts/timeline/67e6a8ba83fecc2fb675c10a');
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
