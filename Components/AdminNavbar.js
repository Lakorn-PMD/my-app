import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

import Image from 'next/image';

export function AdminNavbar() {
    const { data: session, status } = useSession();

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="shadow-md">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center">
                    <Image src="/lakorn-512.png" className="h-8 mr-3" width={128} height={128} alt="Logo" />
                    <span className="self-center text-2xl whitespace-nowrap">Lakorn PMD</span>
                </Link>
                <button onClick={toggleMenu} className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http:www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className={`w-full md:w-auto md:flex ${menuOpen ? 'block' : 'hidden'}`}>
                    <ul className={`font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0`}>
                        <li>
                            <Link href="/" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-white md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">หน้าหลัก</Link>
                        </li>
                        <li>
                            <Link href="/ticket" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-white md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">จองตั๋ว</Link>
                        </li>
                        <li>
                            <Link href="/product" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-white md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">ราคา</Link>
                        </li>
                        <li>
                            <Link href="/contact" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-white md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">ติดต่อ</Link>
                        </li>
                        <li>
                            {session ? (
                                <button onClick={() => signOut()} type="button" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover-bg-gray-100 md:hover-bg-transparent md:border-0 md:hover-text-blue-700 md:p-0">
                                    ออกจากระบบ
                                </button>
                            ) : (
                                <Link href="/auth/login" passHref>
                                    <div className="block py-2 pl-3 pr-4 text-gray-900 rounded hover-bg-gray-100 md:hover-bg-transparent md:border-0 md:hover-text-blue-700 md:p-0">
                                        เข้าสู่ระบบ
                                    </div>
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav >
    );
};
