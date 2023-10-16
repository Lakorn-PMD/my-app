import { useState } from 'react';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Swal from 'sweetalert2';
import { signIn } from 'next-auth/react';

import { Navbar } from '@/Components/Navbar';

export default function Login() {
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await signIn('credentials', {
            username,
            password: Buffer.from(password).toString('base64'),
            redirect: false
        });

        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Login Successfully',
                showConfirmButton: false,
                timer: 1500
            }).then((result) => {
                router.push('/');
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Something went wrong',
                text: response.error,
            });
        }

    }
    return (
        <main className="min-h-screen bg-gray-100">
            <Head>
                <title>Login</title>
            </Head>
            <Navbar />
            <div className="flex flex-col items-center p-16">
                <div className="text-center">
                    <Image className="mx-auto h-16 w-auto" height={128} width={128} src="/lakorn.png" alt="LOGO" />
                    <h2 className="mt-6 text-center text-neutral-800 text-2xl">Sign in to your account</h2>
                </div>

                <div className="mt-10 w-4/5 md:w-96">
                    <form className="space-y-4" onSubmit={handleSubmit} method="POST">
                        <div>
                            <label htmlFor="username" className="block text-sm text-neutral-800">Username or Email</label>
                            <div>
                                <input id="username" value={username} onChange={(e) => { setUsername(e.target.value) }} name="username" type="text" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm text-neutral-800">Password</label>
                            <div>
                                <input id="password" value={password} onChange={(e) => { setPassword(e.target.value) }} minLength={8} name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-bskylue-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div className="text-sm text-right mt-2">
                            <Link href="#" className="text-blue-600 hover:text-blue-500">Forgot password?</Link>
                        </div>
                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Sign in</button>
                        </div>
                    </form>

                    <p className="mt-8 text-center text-sm text-neutral-800">
                        Not a member?
                        <Link href="./register" className="font-semibold leading-6 text-blue-600 hover:text-blue-500 mx-2">Register Here</Link>
                    </p>
                </div>
            </div>
        </main>
    )
}