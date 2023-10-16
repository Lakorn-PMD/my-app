
import { useState } from 'react';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import axios from 'axios';
import Swal from 'sweetalert2';

import { Navbar } from '@/Components/Navbar';

export default function Register() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        firstname: '',
        surname: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
    })

    const RegisterSubmit = async (event) => {
        event.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Something went wrong',
                text: 'Password is not match'
            });
            return;
        }

        try {
            const response = await axios('/api/auth/register', {
                method: 'POST',
                data: {
                    email,
                    username,
                    password: Buffer.from(password).toString('base64'),
                }
            });

            if (response.status !== 201) {
                Swal.fire({
                    icon: 'error',
                    title: 'Something went wrong',
                    text: response.data.message,
                });
                return;
            }

            let timerInterval
            Swal.fire({
                title: 'Auto close alert!',
                html: 'Redirect to Login Page in <b></b> ms.',
                timer: 3000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                    const b = Swal.getHtmlContainer().querySelector('b');
                    timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft();
                    }, 100);
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                router.push('/login');
            })


        } catch (err) {
            if (err.response.status && err.response.data) {
                Swal.fire({
                    icon: 'error',
                    title: 'Something went wrong',
                    text: err.response.data.message,
                });
            } else {
                console.error(err.message);
            }
        }
    }

    const handleOnChange = (e) => {
        e.preventDefault();

        const { name, value } = e.target;

        const newValue = name === 'password' || name === 'confirmPassword' ? Buffer.from(value).toString('base64') : value;

        setFormData({
            ...formData,
            [name]: newValue,
        });
    }

    return (
        <main className="min-h-screen bg-gray-100">
            <Head>
                <title>Login</title>
            </Head>
            <Navbar />
            <div className="flex flex-col items-center justify-center p-2">
                <div className="text-center">
                    <Image className="mx-auto h-16 w-auto" height={128} width={128} src="/lakorn.png" alt="Logo" />
                    <h2 className="mt-6 text-center text-neutral-800 text-2xl">Sign in to your account</h2>
                </div>

                <div className="mt-10 w-72 md:w-96">
                    <form className="space-y-4" onSubmit={RegisterSubmit} method="POST">
                        <div className='flex space-x-4'>
                            <div>
                                <label htmlFor="firstname" className="block text-sm text-neutral-800">Firstname</label>
                                <input id="firstname" value={formData.firstname} onChange={handleOnChange} name="firstname" type="text" autoComplete="firstname" required className="block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                            </div>
                            <div>
                                <label htmlFor="surname" className="block text-sm text-neutral-800">Surname</label>
                                <input id="surname" value={formData.surname} onChange={handleOnChange} name="surname" type="text" autoComplete="surname" required className="block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                            </div>

                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm text-neutral-800">Email</label>
                            <div>
                                <input id="email" value={formData.email} onChange={handleOnChange} name="email" type="email" required className="block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="username" className="block text-sm text-neutral-800">Username</label>
                            <div>
                                <input id="username" value={formData.username} onChange={handleOnChange} name="username" type="text" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm text-neutral-800">Password</label>
                            <div>
                                <input id="password" value={formData.password} onChange={handleOnChange} minLength={8} name="password" type="password" required className="block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm text-neutral-800">Confirm Password</label>
                            <div>
                                <input id="confirmPassword" value={formData.confirmPassword} onChange={handleOnChange} minLength={8} name="confirmPassword" type="password" required className="block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div className="text-sm text-right mt-2">
                            <Link href="#" className="text-blue-600 hover:text-blue-500">Forgot password?</Link>
                        </div>
                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Sign up</button>
                        </div>
                    </form>

                    <p className="mt-8 text-center text-sm text-neutral-800">
                        Already a member?
                        <Link href="./login" className="font-semibold leading-6 text-blue-600 hover:text-blue-500 mx-2">Login Here</Link>
                    </p>
                </div>
            </div>
        </main>
    )
}