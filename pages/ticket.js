import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Container from '@mui/material/Container';
import { Navbar } from '@/Components/Navbar';

import Link from 'next/link';

import { useSession, signIn } from 'next-auth/react';

export default function Index({ data }) {
    const { data: session, status } = useSession();
    const [optionValue, setOptionValue] = useState(null);

    const router = useRouter();
    console.log(session)
    const handleSelectChange = (event) => {
        event.preventDefault();
        setOptionValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (optionValue) {
            router.push('/seat/' + optionValue);
        }
    };

    return (
        <div className='bg-gray-100 min-h-screen'>
            <Head>
                <title>ละครเวทีพระมารดา</title>
            </Head>
            <Navbar />
            <Container maxWidth="md" className="text-center p-8">
                {status === 'unauthenticated' ? (
                    <Link href="/auth/login" className='text-white font-semibold bg-blue-500 hover:bg-blue-700 rounded-xl px-4 py-2'>เข้าสู่ระบบก่อนสั่งจองบัตร</Link>
                ) : (
                    <>
                        <h1 className="text-3xl font-semibold mb-4">จองบัตรละครเวที</h1>

                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900">Select an option</label>
                        <select onChange={handleSelectChange} id="countries" value={optionValue} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required>
                            <option defaultValue={""} selected disabled hidden>เลือกรอบ</option>
                            {data.map((i) => (
                                <option value={i.name}>{i.name}</option>
                            ))}
                        </select>
                        <button onClick={handleSubmit} className='mt-4 px-4 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded-lg '>ยืนยัน</button>
                    </>
                )
                }
            </Container >
        </div >
    );
};

export async function getServerSideProps() {
    const res = await fetch('http://localhost:4000/api/seat');
    const data = await res.json();
    if (!res.ok) {
        return {
            props: {
                data: null
            }
        }
    }
    return {
        props: {
            data: data
        },
    };
}