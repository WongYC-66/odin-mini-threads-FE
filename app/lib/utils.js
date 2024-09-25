import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import API_URL from "./apiUrl"
import 'dotenv/config'

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

export function updateLocalStorage(payload) {
  const original = readLocalStorage()
  const updated = { ...original, ...payload }
  localStorage.setItem('user', JSON.stringify(updated))
}

export async function fetchDynamicParams(endpoint) {
  // return [ { username, id }], or [{username}]
  console.log(process.env.NEXT_USER)
  console.log(process.env.NEXT_PASSWORD)
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: process.env.NEXT_USER,
      password: process.env.NEXT_PASSWORD,
    }),
    cache: 'no-store'
  });

  let { data, error } = await response.json()

  if (!data || error) {
    console.error(`error. GET ${endpoint}`, error)
    return { error }
  }

  console.log(data)
  return { data }
}

export function appendFrontEndDomain() {
  const FRONT_END_DOMAIN = window.location.origin;
  return encodeURIComponent(FRONT_END_DOMAIN)
}