import Image from "next/image";
import { useState } from "react";
import { io } from 'socket.io-client';
const socket = io('https://api.akkanop.in.th');

export function CartIconComponents({ name, seat }) {
    const [open, setOpen] = useState(false);
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        await fetch('https://api.akkanop.in.th/api/seat/reserved', {
            method: 'POST',
            body: JSON.stringify({
                seat,
                name
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
    return (
        <>
            <button onClick={handleOnSubmit} className="fixed bottom-0 right-0 p-4 hover:cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-[#56C2FF] flex items-center justify-center" onClick={() => setOpen(!open)}>
                </div>
            </button>
            {/* <div className="fixed bottom-0 right-0 p-4 hover:cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-[#56C2FF] flex items-center justify-center" onClick={() => setOpen(!open)}>
                    <Image src="/cart-shopping.svg" className="w-8" alt="TEST" width={50} height={50} />
                </div>
            </div>
            {open && (
                <div className="fixed bottom-14 right-0 rounded-md">
                    <div className="w-52 bg-zinc-300 rounded-lg">
                        <div>
                            <p>Zone A</p>
                        </div>
                    </div>
                </div>
            )} */}
        </>
    );
}
