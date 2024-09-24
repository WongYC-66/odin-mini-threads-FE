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

import API_URL from '@/app/lib/apiUrl.js'

export default function ModalUpdateProfile(props) {
  const { profile, open, setOpen, setIsLoading } = props

  const inputPhotoURL = useRef(null);
  const [showInput, setShowInput] = useState(true)
  const [avatarURL, setAvatarURL] = useState(profile?.userProfile.photoURL || '/user2.png')

  const handleFileUpload = async (e) => {
    const { token } = JSON.parse(localStorage.getItem('user'))
    const file = e.target.files[0]
    console.log(file)
    if (!file) return

    // return is a image link, populate to current photo and photoURL input
    // disable photoURL input,

    const formData = new FormData();
    formData.append('avatar', file); // Append the file to FormData object

    const response = await fetch(`${API_URL}/profiles/update-photo/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`, // Attach the Bearer token
      },
      body: formData,
    });

    const { photoURL, error } = await response.json()
    if (error || !photoURL) {
      console.log("error : ", error)
      return
    }
    // passed
    // console.log(photoURL)
    setAvatarURL(photoURL)
    inputPhotoURL.current.value = photoURL
    setShowInput(false)
  }

  const handleUpdateProfileSubmit = async (e) => {
    e.preventDefault()

    const sendRequest = async () => {
      const { token } = JSON.parse(localStorage.getItem('user'))
      const formData = new FormData(e.target);
      const objectData = Object.fromEntries(formData.entries());

      if (!showInput)
        objectData.photoURL = avatarURL    // append if input is set hidden

      const response = await fetch(`${API_URL}/profiles/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Attach the Bearer token
        },
        body: JSON.stringify(objectData),
      });

      let { error } = await response.json()

      // if error show error message
      if (error) {
        console.error(error)
        alert("Ooops, something went wrong, try again")
        return
      }
      // passed, do something..
      setIsLoading(true)
      setShowInput(true)
    }

    sendRequest()
    setOpen(false)
    console.log("updated!!")
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
