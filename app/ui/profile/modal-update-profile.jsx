'use client'

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

  const handleUpdateProfileSubmit = async (e) => {
    e.preventDefault()

    const sendRequest = async () => {
      const { token } = JSON.parse(localStorage.getItem('user'))
      const formData = new FormData(e.target);
      const objectData = Object.fromEntries(formData.entries());

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
              <h4 className="font-bold">First Name</h4>
              <Input placeholder="..." name="firstName" defaultValue={profile.userProfile.firstName} required />
              {/* lastName */}
              <h4 className="font-bold">Last Name</h4>
              <Input placeholder="..." name="lastName" defaultValue={profile.userProfile.lastName} required />
            </div>

            {/* Rounded Photo */}
            <div className="grow flex justify-center items-center">
              <Image alt='photo' className="rounded-full" src={profile?.userProfile.photoURL} width={75} height={75} />
            </div>
          </div>

          {/* bio */}
          <h4 className="font-bold">Bio</h4>
          <Textarea placeholder="your description ... " name="bio" defaultValue={profile.userProfile.bio} required />

          {/* photoUrl */}
          <h4 className="font-bold">{`Photo URL [optional]`} </h4>
          <Input placeholder="..." name="photoURL" defaultValue={profile.userProfile.photoURL} required />

        </form>

        <DialogFooter>
          <Button type="submit" form="updateForm">Done</Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
}
