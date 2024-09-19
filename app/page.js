'use client'

import { useState, useEffect } from 'react';

import PostSkeleton from "./ui/post/post-skeleton.jsx";
import Post from "./ui/post/post.jsx";
import API_URL from './lib/apiUrl.js'
import AddPostSkeleton from './ui/post/add-post-skeleton.jsx';

export default function Home() {

  const [fetchCount, setFetchCount] = useState(1)
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

      let { posts, error } = await response.json()

      // if error show error message
      if (error) {
        console.error(error)
        return
      }
      // passed
      return posts
    }

    const updateContainer = async () => {
      const posts = await getPosts()
      console.log(posts)
      // todo here:
      // get the posts from backend, why is it not working!! check F12
      // await(new Promise((res) => setTimeout(() => res(), 200000)))
      setIsLoading(false)
    }

    updateContainer()

  }, [])

  return (
    <div className="h-full">
      <h2 className="text-center font-black">Home</h2>

      <div id="container" className="container mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl border-solid border-2 rounded-t-3xl min-h-screen bg-white p-0">
        <AddPostSkeleton />

        {isLoading && Array(10).fill().map((_, i) => <PostSkeleton key={`${i}-dummy-post`}/>)}
      </div>

    </div>
  );
}
