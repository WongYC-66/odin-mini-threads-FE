'use client'

import React, { useState, useEffect, useRef, Suspense } from 'react'
import Image from "next/image"

import Card from "../ui/search/card.jsx";
import CardSkeleton from '../ui/search/card-skeleton.jsx';

import { getAllUsers } from '../lib/fetchAPI.js';
import { filterUser } from '../lib/utils.js';

export default function SearchPage() {

    const inputRef = useRef(null); // Create a ref
    const [query, setQuery] = useState('')
    const [filteredProfiles, setFilteredProfiles] = useState([])
    const [allProfiles, setAllProfiles] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // fetch all Profiles
        const sendRequest = async () => {
            const { profiles, error } = await getAllUsers()
            if (!error) {
                setIsLoading(false)
                setAllProfiles(profiles)
            }
        }
        sendRequest()
    }, [])

    useEffect(() => {
        // Filter profile by query
        const filteredProfiles = filterUser(query, allProfiles)
        setFilteredProfiles(filteredProfiles)
    }, [query, allProfiles])

    const handleInputChange = (e) => {
        setQuery(e.target.value)
    }

    const clearQuery = () => {
        setQuery('')
        inputRef.current.focus()
    }

    return (
        <div className="h-full">
            <h2 className="hidden md:block text-center font-black my-4">Search</h2>

            {/* <div id="container" className="container mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl border-solid border-2 rounded-t-3xl min-h-screen bg-white p-8"> */}
            <div id="container" className="container mx-auto md:max-w-md lg:max-w-lg xl:max-w-xl border-solid border-2 rounded-t-3xl min-h-screen bg-white p-8 w-screen">

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