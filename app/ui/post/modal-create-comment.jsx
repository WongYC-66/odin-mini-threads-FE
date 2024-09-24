'use client'

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

import { createNewComment } from "@/app/lib/fetchAPI"
import { readLocalStorage } from "@/app/lib/utils"

export default function ModalNewComment(props) {

  const open = props.open
  const setOpen = props.setOpen
  const postId = props.postId
  const postAuthorName = props.postAuthorName
  const setIsLoading = props.setIsLoading

  const {username, photoURL} = readLocalStorage()

  const handleNewCommentSubmit = async (e) => {
    e.preventDefault()

    const sendRequest = async () => {
      const { error } = await createNewComment(e, postId)
      setIsLoading(true)
      if (!error)
        console.log("commented!!")
    }
    sendRequest()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Edit Profile</Button> */}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-white modal-content">

        <DialogHeader>
          <DialogTitle className='text-center'>Reply</DialogTitle>
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
            <form id="newComment" onSubmit={handleNewCommentSubmit}>
              <Textarea placeholder={`Reply to ${postAuthorName}`} id="postContent" name="content" required />
            </form>

          </div>
        </div>

        <DialogFooter>
          <Button type="submit" form="newComment">Post</Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
}
