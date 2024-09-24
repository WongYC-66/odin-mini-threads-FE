'use client'

import { useState, useRef } from "react"
import Image from "next/image"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { putProfileUpdate, uploadPhotoAndGetURL } from "@/app/lib/fetchAPI"

export default function ModalUpdateProfile(props) {
  const { profile, open, setOpen, setIsLoading } = props

  const inputPhotoURL = useRef(null);
  const [showInput, setShowInput] = useState(true)
  const [avatarURL, setAvatarURL] = useState(profile?.userProfile.photoURL || '/user2.png')

  const handleFileUpload = async (e) => {
    const sendRequest = async () => {
      const file = e.target.files[0]
      if (!file) return
      const { photoURL, error } = await uploadPhotoAndGetURL(file)
      if (error) return
      setAvatarURL(photoURL)
      inputPhotoURL.current.value = photoURL
      setShowInput(false)
    }
    sendRequest()
  }

  const handleUpdateProfileSubmit = async (e) => {
    e.preventDefault()
    const sendRequest = async () => {
      let { error } = await putProfileUpdate(e, avatarURL, !showInput)
      if(error) return
      setIsLoading(true)
      console.log("updated!!")
      window.location.reload()
    }
    sendRequest()
    setOpen(false)
    setShowInput(true)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogTitle className="hidden">Update My Profile</DialogTitle>
        <DialogDescription></DialogDescription>

        <form id="updateForm" onSubmit={handleUpdateProfileSubmit}>
          <div className="flex">
            <div>
              {/* firstName */}
              <h4 className="font-bold my-2">First Name</h4>
              <Input placeholder="..." name="firstName" defaultValue={profile.userProfile.firstName} required />
              {/* lastName */}
              <h4 className="font-bold my-2">Last Name</h4>
              <Input placeholder="..." name="lastName" defaultValue={profile.userProfile.lastName} required />
            </div>

            {/* Rounded Avatar Photo */}
            <div className="relative grow flex justify-center items-center ">
              <div className="w-[75px] h-[75px] overflow-hidden flex justify-center">
                <Image alt='photo' className="rounded-full object-cover" src={avatarURL} width={75} height={75} />
              </div>

              {/* Upload icon */}
              {/* Hidden file input */}
              <input id="fileInput" name="avatar" type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e)} />

              {/* Upload icon wrapped in label */}
              <label htmlFor="fileInput">
                <Image alt='upload_icon' className="absolute transform -translate-x-6 translate-y-1/2 hover:scale-110 cursor-pointer" src='/upload.png' width={35} height={35} />
              </label>
            </div>
          </div>

          {/* bio */}
          <h4 className="font-bold my-2">Bio</h4>
          <Textarea placeholder="your description ... " name="bio" defaultValue={profile.userProfile.bio} required />

          {/* photoUrl */}
          {showInput && <>
            <h4 className="font-bold my-2">{`Photo URL [optional]`} </h4>
            <Input placeholder="..." name="photoURL" defaultValue={profile.userProfile.photoURL} ref={inputPhotoURL} required />
          </>}

        </form>

        <DialogFooter>
          <Button type="submit" form="updateForm">Done</Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
}
