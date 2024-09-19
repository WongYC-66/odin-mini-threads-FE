'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import styles from './signIn.module.css';
import API_URL from '../lib/apiUrl.js'

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

        let { id, token, username, error } = await response.json()

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
        }))

        router.push('/');
    }


    return (
        <div className={`flex flex-col justify-center items-center h-full w-full ${styles.background}`}>
            <h2 className="text-center font-black">Log In</h2>

            <form onSubmit={handleSignIn}>
                <Input type="text" placeholder="your username" name="username" required/>
                <Input type="password" placeholder="" name="password" className="my-4" required/>

                <Button type="submit" className="px-24">Log In</Button>

            </form>

            <p className="py-4">or</p>

            <Link href='/sign-up'>
                <Button type="button" className="px-20">Sign Up here</Button>
            </Link>

            <br />
            <h5 className='text-red-600'> {errorMsg} </h5>

        </div>
    )
}
