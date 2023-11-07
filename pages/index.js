import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/Components/Navbar';

export default function Index() {

    return (
        <main className="bg-gray-100 min-h-screen">
            <Head>
                <title>Lakorn PMD</title>
            </Head>
            <Navbar />

            <div className='text-center p-8'>
                <p className='text-3xl font-normal'>ติดตามข่าวสารได้ที่</p>
                <div className='mt-6 flex flex-col sm:flex-row items-center justify-center gap-6'>
                    <Link href="https://www.instagram.com/lakornpmd_official/" target="_blank">
                        <Image src="/Instagram_512.png" width={64} height={64} />
                    </Link>
                    <Link href="https://www.tiktok.com/@lakornpramandaofficial" target="_blank">
                        <Image src="/tiktok-icon.png" width={64} height={64} />
                    </Link>
                    <Link href="https://www.facebook.com/lakornpmd" target="_blank">
                        <Image src="/facebook.png" width={64} height={64} />
                    </Link>
                </div>
            </div>
        </main>
    );
}
