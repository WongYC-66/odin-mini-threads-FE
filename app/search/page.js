'use client'

import React, { useState, useEffect, useRef, Suspense } from 'react'

import Image from "next/image"

import Card from "../ui/search/card.jsx";
import API_URL from '../lib/apiUrl.js'
import CardSkeleton from '../ui/search/card-skeleton.jsx';

export default function SearchPage() {

    const inputRef = useRef(null); // Create a ref
    const [query, setQuery] = useState('')
    const [filteredProfiles, setFilteredProfiles] = useState([])
    const [allProfiles, setAllProfiles] = useState([])
    const [myFollowings, setMyFollowings] = useState(new Set())
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // fetch all Profiles
        const { token } = JSON.parse(localStorage.getItem('user'))

        const fetchProfiles = async () => {
            const response = await fetch(`${API_URL}/profiles/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Attach the Bearer token
                },
            });

            let { profiles, myFollowings, error } = await response.json()

            // if error show error message
            if (error || !profiles) {
                console.error(error)
                return
            }
            // passed
            setAllProfiles(profiles)
            setMyFollowings(new Set(myFollowings))
            setIsLoading(false)
        }

        fetchProfiles()
    }, [])

    useEffect(() => {
        // Filter profile by query
        const { username: mySelfUsername } = JSON.parse(localStorage.getItem('user'))

        const q = query.toLowerCase()
        const filtered = allProfiles
            .filter(({ user }) => user.username !== mySelfUsername)     // not self
            .filter(({ firstName, lastName, user }) => {
                return firstName.toLowerCase().includes(q) ||
                    lastName.toLowerCase().includes(q) ||
                    user.username.toLowerCase().includes(q)
            })
            .map(profile => {
                profile.isFollowing = myFollowings.has(profile.user.username)       // add attribute isFollowing 
                return profile
            })

        setFilteredProfiles(filtered)
    }, [query, allProfiles, myFollowings])

    const handleInputChange = (e) => {
        setQuery(e.target.value)
    }

    const clearQuery = () => {
        setQuery('')
        inputRef.current.focus()
    }

    // console.log(filterProfiles)
    // console.log({ myFollowings })

    return (
        <div className="h-full">
            <h2 className="text-center font-black">Search</h2>

            <div id="container" className="container mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl border-solid border-2 rounded-t-3xl min-h-screen bg-white p-8">

                {/* Search Bar */}
                <div className="flex justify-between items-center bg-slate-100 p-4 border-2 rounded-xl">
                    <label htmlFor="searchInput">
                        <Image alt="search" src="/search.png" width={25} height={25} />
                    </label>

                    <div className="grow mx-4">
                        <input id="searchInput" type="email" placeholder="Search" value={query} onChange={handleInputChange} ref={inputRef}
                            className="bg-slate-100 focus:outline-none w-full" />
                    </div>

                    {query && <Image alt="clear" src="/remove.png" width={25} height={25} onClick={clearQuery} />}

                </div>

                {/* User Card */}
                {isLoading && Array(10).fill().map((_, i) => <CardSkeleton key={`${i}-dummy`} />)}
                {!isLoading && filteredProfiles.map(profile => <Card key={profile.id} profile={profile} />)}

            </div>

        </div>
    )
}