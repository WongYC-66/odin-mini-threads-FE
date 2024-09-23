'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import Image from 'next/image';

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import styles from '../sign-in/signIn.module.css';
import API_URL from '../lib/apiUrl.js'

export default function SignUpPage() {

    const router = useRouter();

    const [errorMsg, setErrorMsg] = useState('')

    const handleSignUp = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target);
        const objectData = Object.fromEntries(formData.entries());

        const response = await fetch(`${API_URL}/users/sign-up`, {
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
            document.getElementById('confirmPassword').value = ""
            return
        }

        // passed
        localStorage.setItem("user", JSON.stringify({
            id,
            username,
            token,
            photoURL
        }))

        router.push('/');
    }

    return (
        <div className={`flex flex-col justify-center items-center h-full w-full ${styles.background}`}>
            <h2 className="text-center font-black">Register new account</h2>

            <form onSubmit={handleSignUp}>
                <Input type="text" placeholder="your username" name="username" required />
                <Input type="password" placeholder="password" name="password" id="password" className="my-4" required />
                <Input type="password" placeholder="confirm password" name="confirmPassword" id="confirmPassword" className="my-4" required />

                <Button type="submit" className="px-24">Sign up</Button>

            </form>

            <p className="py-4">or</p>

            <Link href='/sign-in'>
                <Button type="button" className="w-[200px]">Sign in here</Button>
            </Link>

            <a href={`${API_URL}/users/auth/github`}>
                <Button type="button" className="my-4 w-[200px] bg-white text-black">
                    <Image alt='github-logo' src='/github.png' width={24} height={24} />
                    <p className='ms-3'>Github Login </p>
                </Button>
            </a>

            <br />
            <h5 className='text-red-600'> {errorMsg} </h5>

        </div>
    )
}