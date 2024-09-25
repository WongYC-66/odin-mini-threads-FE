'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import Image from 'next/image';

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import styles from './signIn.module.css';
import API_URL from '../lib/apiUrl.js'
import { guestLogin } from '@/app/lib/guest.js'
import { appendFrontEndDomain } from '../lib/utils';

export default function SignInPage() {

    const router = useRouter();

    const [errorMsg, setErrorMsg] = useState('')

    const handleSignIn = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target);
        const objectData = Object.fromEntries(formData.entries());

        const response = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objectData),
        });

        let { id, token, username, photoURL, error } = await response.json()

        // if error show error message
        if (error || !id || !token) {
            console.error(error)
            setErrorMsg(error)
            document.getElementById('password').value = ""
            return
        }

        // passed
        localStorage.setItem("user", JSON.stringify({
            id,
            username,
            token,
            photoURL,
        }))

        router.push('/');
    }

    useEffect(() => {
        // Check if there is a token in the URL (from GitHub redirect)
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const id = urlParams.get('id');
        const username = urlParams.get('username');
        const photoURL = urlParams.get('photoURL');

        if (token && id) {
            localStorage.setItem("user", JSON.stringify({ id, username, token, photoURL }));
            router.push('/');
        }
    }, [router]);

    useEffect(() => {
        // Check if user has login in / registed before, if so, goto home
        const data = localStorage.getItem('user')
        if(!data) return
        router.push('/');
    }, [router])
    

    return (
        <div className={`flex flex-col justify-center items-center h-full w-full ${styles.background}`}>
            <h2 className="text-center font-black">Log In</h2>

            <form onSubmit={handleSignIn}>
                <Input type="text" placeholder="your username" name="username" required />
                <Input type="password" placeholder="" name="password" className="my-4" required />

                <Button type="submit" className="px-24">Log In</Button>

            </form>

            <p className="py-4">or</p>

            <Link href='/sign-up'>
                <Button type="button" className="w-[200px]">Sign Up here</Button>
            </Link>

            <a href={`${API_URL}/users/auth/github?${appendFrontEndDomain()}`}>
                <Button type="button" className="my-4 w-[200px] bg-white text-black">
                    <Image alt='github-logo' src='/github.png' width={24} height={24} />
                    <p className='ms-3'>Github Login </p>
                </Button>
            </a>

            <Button type="button" className="w-[200px]" onClick={guestLogin}>
                Guest Login
            </Button>

            <br />
            <h5 className='text-red-600'> {errorMsg} </h5>

        </div>
    )
}
