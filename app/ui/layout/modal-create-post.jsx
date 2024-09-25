'use client'

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { createNewPost, uploadPhotoAndGetURL } from "@/app/lib/fetchAPI"

export default function ModalNewPost(props) {

  const open = props.open
  const setOpen = props.setOpen
  const setIsLoading = props.setIsLoading

  const [username, setUsername] = useState('')
  const [photoURL, setPhotoURL] = useState('/user2.png')

  const [showUpload, setShowUpload] = useState(false)
  const [uploadPhotoURL, setUploadPhotoURL] = useState('')

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user'))
    if (!data) return
    const { username, photoURL } = data
    setUsername(username)
    setPhotoURL(photoURL || '/user2.png')
  }, [])

  const handleFileUpload = async (e) => {
    const sendRequest = async () => {
      const file = e.target.files[0]
      if (!file) return
      const { photoURL, error } = await uploadPhotoAndGetURL(file)
      if (error) return
      setUploadPhotoURL(photoURL)
      setShowUpload(true)
    }
    sendRequest()
  }

  const handleNewPostSubmit = async (e) => {
    const sendRequest = async () => {
      let { error } = await createNewPost(e)
      if (error) return
      console.log("submitted!")
      if (setIsLoading)
        setIsLoading(true) // partially refresh by fetch at root url if triggers from home screen
      else
        window.location.reload() // full refresh if triggers from nav bar (left/bottom)
    }
    e.preventDefault()
    sendRequest()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Edit Profile</Button> */}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-white">

        <DialogHeader>
          <DialogTitle className='text-center'>New Thread</DialogTitle>
          <DialogDescription>
            {/* {`Make changes to your profile here. Click save when you're done.`} */}
          </DialogDescription>
        </DialogHeader>

        <div className="flex">
          {/* User Photo */}
          <div className='relative flex items-start h-min-0'>
            <Image alt='photo' src={photoURL} width={50} height={50} />
          </div>

          <div className='w-full ms-3 flex flex-col justify-between'>

            {/* User's username */}
            <div className='min-h-4'>
              <span className=' font-bold hover:underline'> {username}</span>
            </div>

            {/* post's content */}
            <form id="newPost" onSubmit={handleNewPostSubmit}>
              <Textarea placeholder="Type your message here." id="postContent" name="content" required />
              {/* limit 1 photo per post*/}
              <input name='imgURL' value={uploadPhotoURL} hidden onChange={() => { }} />  
            </form>

            {/* Photo uploaded */}
            {showUpload &&
              <div className="py-3 flex justify-center overflow-hidden min-w-[300px] min-h-[300px]">
                <Image alt='uploaded-image' className='object-cover' src={uploadPhotoURL} height={300} width={300} />
              </div>
            }

          </div>
        </div>

        <DialogFooter>
          {/* Icon Upload photo */}
          <label htmlFor="fileInput" className="h-[45px] block hover:scale-105 hover:cursor-pointer">
            <Image src='/upload.png' alt='upload_icon' width={45} height={45} />
          </label>
          <input id="fileInput" name="avatar" type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e)} />

          <Button type="submit" form="newPost">Post</Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
}
