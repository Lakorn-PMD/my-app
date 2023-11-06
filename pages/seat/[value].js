import React, { useState, useEffect } from 'react';
import Head from 'next/head';

import { Navbar } from '@/Components/Navbar';
import { CartIconComponents } from '@/Components/CartIconComponents';

import Container from '@mui/material/Container';

import { motion } from 'framer-motion';
import { io } from 'socket.io-client';
const socket = io('https://api.akkanop.in.th');


function Seat({ data }) {
    const [showSeats, setShowSeats] = useState(false);
    const [seatZone, setSeatZone] = useState(0);

    const [selectSeat, setSelectSeat] = useState([]);

    const handleSelectChange = (e, letter) => {
        e.preventDefault();
        setShowSeats(true);
        setSeatZone(letter);
    }

    const RenderSeat = () => {
        const checkZone = data.seatDetails.filter((i) => i.zone === seatZone);
        const uniqueCols = new Set();
        const uniqueRows = new Set();

        checkZone.forEach(zone => {
            zone.cells.forEach(cell => {
                uniqueCols.add(cell.col);
            });
        });

        checkZone.forEach(zone => {
            zone.cells.forEach(cell => {
                uniqueRows.add(cell.row);
            });
        });
        const handleOnSelectSeat = (key) => {
            const isSeatSelected = selectSeat.some((seatCell) => seatCell.seat === key);

            if (isSeatSelected) {
                setSelectSeat(selectSeat.filter((seatCell) => seatCell.seat !== key));
            } else {
                setSelectSeat([...selectSeat, { zone: seatZone, seat: key }]);
            }
        };

        return (
            <>
                <button onClick={() => setShowSeats(false)} className="mx-auto block my-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200">
                    Get Back
                </button>
                <div className='flex flex-col gap-4 items-center'>
                    {Array.from({ length: uniqueRows.size }, (_, index) => (
                        <div className="flex flex-row justify-between gap-4" key={index}>
                            <div className="text-2xl font-bold">
                                <span className="w-6 text-center inline-block">
                                    {String.fromCharCode(index + 97).toUpperCase()}
                                </span>
                            </div>
                            {checkZone[0].cells.filter((cell) => cell.row === index).map((cell) => (
                                <button onClick={(e) => handleOnSelectSeat(cell.alphabetID)} key={cell.alphabetID} className={`w-8 h-8 ${cell.isSold ? "bg-red-500" : "bg-gray-300"} ${selectSeat.some((seatCell) => seatCell.seat === cell.alphabetID) ? "bg-green-500" : "bg-gray-300"} rounded-full text-blue-800 flex items-center justify-center`} disabled={cell.isSold}>
                                </button>
                            ))}
                        </div>
                    ))}
                </div>
            </>
        )
    }

    return (
        <main>
            <Head>
                <title>{`${data.name} | Lakorn PMD`}</title>
            </Head>
            <Navbar />
            <Container maxWidth="lg" className="text-center p-8">
                <div className="border-2 mb-4 text-xl font-bold">
                    หน้าเวที
                </div>
                {showSeats ? (
                    <RenderSeat />
                ) : (
                    <div className={`flex flex-row justify-between`}>

                        {data.seatDetails.map((i, _) => (
                            <motion.button
                                onClick={(e) => handleSelectChange(e, i.zone)}
                                onHoverStart={''}
                                whileHover={{ scale: 1.1 }}
                                key={i.zone}
                                className='flex items-center justify-center transition-all duration-200 bg-sky-400 shadow-none hover:shadow-lg hover:text-white hover:bg-sky-500 w-20 md:w-40 lg:w-60 h-24 md:h-48 lg:h-64  hover:cursor-pointer'
                            >
                                <div className="text-center text-xl md:text-3xl font-semibold">Zone {i.zone}</div>
                            </motion.button>
                        ))}
                    </div>
                )}
                <CartIconComponents seat={selectSeat} name={data.name} />

            </Container>
        </main>
    )
}

export async function getServerSideProps(context) {
    const { value } = context.query;
    const res = await fetch('https://api.akkanop.in.th/api/seat?name=' + value);
    const data = await res.json();

    return {
        props: {
            data
        }
    }
}

export default Seat;
