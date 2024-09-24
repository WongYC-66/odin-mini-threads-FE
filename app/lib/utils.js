import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function readLocalStorage() {
  const data = JSON.parse(localStorage.getItem('user'))
  if (!data) return { error: 'Error, local data not found' }
  const { id, username, token, photoURL } = data
  return { id, username, token, photoURL }
}

export function checkAuth(){
  const { username, id, token, photoURL, error } = readLocalStorage()
  if (error) {
    return false
  }
  if([username,id,token,photoURL].map(Boolean).every(Boolean)) 
    return true     // if all are truthy, is Logged in

  return false      // if one of them is falsy, not logged in
}

