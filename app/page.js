'use client'

import { useState, useEffect, useRef } from 'react';

import PostSkeleton from "./ui/post/post-skeleton.jsx";
import Post from "./ui/post/post.jsx";
import API_URL from './lib/apiUrl.js'
import AddPostSkeleton from './ui/post/add-post-skeleton.jsx';

export default function Home() {

  const [fetchCount, setFetchCount] = useState(1)
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {

    const { token } = JSON.parse(localStorage.getItem('user'))

    const getPosts = async () => {
      const response = await fetch(`${API_URL}/posts/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Attach the Bearer token
        },
      });

      let { posts, postLiked, error } = await response.json()

      // if error show error message
      if (error) {
        console.error(error)
        return
      }
      // passed
      postLiked = new Set(postLiked)
      console.log(postLiked)
      posts = posts.map(post => {
        post.isLiked = postLiked.has(post.id)
        return post
      })
      setPosts(prev => [...prev, ...posts])
      setIsLoading(false)
    }

    getPosts()
    // await(new Promise((res) => setTimeout(() => res(), 200000)))
    
  }, [fetchCount])

  return (
    <div className="h-full">
      <h2 className="hidden md:block text-center font-black">Home</h2>

      {/* <div id="container" className="container mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl border-solid border-2 rounded-t-3xl min-h-screen bg-white p-0"> */}
      <div id="container" className="container mx-auto md:max-w-md lg:max-w-lg xl:max-w-xl border-solid border-2 rounded-t-3xl min-h-screen bg-white p-0">

        <AddPostSkeleton/>

        {isLoading && Array(10).fill().map((_, i) => <PostSkeleton key={`${i}-dummy-post`} />)}
        {!isLoading && posts.map((post, i) => 
          <Post key={i} post={post}/>
        )}
      </div>

    </div>
  );
}
