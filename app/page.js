'use client'

import { useState, useEffect } from 'react';

import Post from "./ui/post/post.jsx";
import PostSkeleton from "./ui/post/post-skeleton.jsx";
import AddPostSkeleton from './ui/post/add-post-skeleton.jsx';

import { getAllFollowingPosts } from './lib/fetchAPI.js';

export default function Home() {

  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {

    const sendRequest = async () => {
      const { posts, error } = await getAllFollowingPosts()
      setPosts(posts)
      if (!error) {
        setIsLoading(false)
      } else {
        setIsLoading(true)
      }
    }

    sendRequest()

  }, [isLoading])

  return (
    <div className="h-full w-full">
      <h2 className="hidden md:block text-center font-black my-4">Home</h2>

      {/* <div id="container" className="container mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl border-solid border-2 rounded-t-3xl min-h-screen bg-white p-0"> */}
      <div id="container" className="container mx-auto md:max-w-md lg:max-w-lg xl:max-w-xl border-solid border-2 rounded-t-3xl min-h-screen bg-white p-0">

        {/* Add Post Modal Window */}
        <AddPostSkeleton setIsLoading={setIsLoading} />

        {/* Fake skeleton post */}
        {isLoading && Array(10).fill().map((_, i) => <PostSkeleton key={`${i}-dummy-post`} />)}

        {/* Real post */}
        {!isLoading && posts.map((post, i) =>
          <Post key={i} post={post} setIsLoading={setIsLoading} />
        )}
        {!isLoading && posts.length === 0 && <p className='p-6'> oops, there is no recent post. Try follow someone or write ur new post</p>}
      </div>

    </div>
  );
}
