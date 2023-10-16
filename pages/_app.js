import './globals.css';
import 'flowbite';

import { SessionProvider } from "next-auth/react"

import Head from 'next/head';

import { Kanit } from 'next/font/google';
const kanit = Kanit({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap',
});


export default function App({
    Component, pageProps: { session, ...pageProps },
}) {
    return (
        <SessionProvider session={session}>
            <main className={`${kanit.className}`} >
                <Component {...pageProps} />
                <Head>
                    <link rel="icon" type="image/x-icon" href="/lakorn-512.png" />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
                </Head>
            </main>
        </SessionProvider>
    )
}