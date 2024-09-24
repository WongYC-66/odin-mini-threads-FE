import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function readLocalStorage() {
  // if (typeof window == 'undefined') {
  //   return { id: null, username: null, token: null, photoURL: null }
  // }
  const data = JSON.parse(localStorage.getItem('user'))
  if (!data) return { error: 'Error, local data not found' }
  const { id, username, token, photoURL } = data
  return { id, username, token, photoURL }
}

export function checkAuth() {
  const { username, id, token, photoURL, error } = readLocalStorage()
  if (error) {
    return false
  }
  if ([username, id, token, photoURL].map(Boolean).every(Boolean))
    return true     // if all are truthy, is Logged in

  return false      // if one of them is falsy, not logged in
}

export function filterUser(query, allProfiles) {
  // filter the profile by query string, user keyin, and of course, not user himself
  const { username } = readLocalStorage()
  const q = query.toLowerCase()
  const filtered = allProfiles
    .filter(({ user }) => user.username !== username)     // not self
    .filter(({ firstName, lastName, user }) => {
      return firstName?.toLowerCase().includes(q) ||
        lastName?.toLowerCase().includes(q) ||
        user.username.toLowerCase().includes(q)
    })
  return filtered
}


