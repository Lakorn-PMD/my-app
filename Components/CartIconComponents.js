// import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";

export function CartIconComponents({ name, seat }) {
    const [open, setOpen] = useState(false);
    const { data: session } = useSession();
    
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        await fetch('https://api.akkanop.in.th/api/seat/reserved', {
            method: 'POST',
            body: JSON.stringify({
                seat,
                name,
                email: session.user.email
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
        </>
    );
}
