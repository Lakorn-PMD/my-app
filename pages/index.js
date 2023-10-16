import React, { useState } from 'react';
import Head from 'next/head';
import { Navbar } from '@/Components/Navbar';

export default function Index() {

    const [isActive, setIsActive] = useState(0)
    const imageUrls = [
        '/next.svg',
        '/vercel.svg',
        '/lakorn.png',
    ];


    return (
        <main className="bg-gray-100 min-h-screen">
            <Head>
                <title>Lakorn PMD</title>
            </Head>
            <Navbar />

            <div>
                <div>

                </div>
            </div>
        </main>
    );
}
