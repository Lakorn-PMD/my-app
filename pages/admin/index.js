import React, { useState, useRef } from 'react';
import { AdminNavbar } from '@/Components/AdminNavbar';
import Head from 'next/head';

import axios from 'axios';
import Swal from 'sweetalert2';

const DynamicTable = () => {
    const [data, setData] = useState({
        rows: 3,
        columns: 4,
    });

    const [zone, setZone] = useState('');

    const [selectedCells, setSelectedCells] = useState([]);
    const [selectedColumn, setSelectedColumn] = useState([]);

    const [seatZone, setSeatZone] = useState([]);

    const handleOnChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleCellClick = (rowIndex, columnIndex) => {
        const cell = { row: rowIndex, col: columnIndex };
        const isCellSelected = selectedCells.some(
            (selectedCell) => selectedCell.row === cell.row && selectedCell.col === cell.col
        );

        if (isCellSelected) {
            setSelectedCells(selectedCells.filter((selectedCell) => !(selectedCell.row === cell.row && selectedCell.col === cell.col)));
        } else {
            setSelectedCells([...selectedCells, cell]);
        }

    };

    const handleColumnClick = (columnIndex) => {
        const isCellSelected = selectedCells.some(
            (selectedCell) => selectedCell.col === columnIndex
        );
        if (isCellSelected) {
            setSelectedColumn(null);
            setSelectedCells(selectedCells.filter(cell => cell.col !== columnIndex));
        } else {
            setSelectedColumn(columnIndex);
            const selectedCellsInColumn = [];
            for (let i = 0; i < data.rows; i++) {
                selectedCellsInColumn.push({ row: i, col: columnIndex });
            }
            setSelectedCells([...selectedCells.filter(cell => cell.col !== columnIndex), ...selectedCellsInColumn]);
        }
    };

    const handleOnSendToServer = async () => {
        if (!seatZone) return;
        try {
            Swal.fire({
                title: 'ใส่ชื่อห้อง',
                input: 'text',
                inputAttributes: {
                    autocapitalize: 'off'
                },
                showCancelButton: true,
                confirmButtonText: 'Look up',
                showLoaderOnConfirm: true,
                preConfirm: (name) => {
                    return fetch('http://localhost:4000/api/seat/create/' + name, {
                        method: 'POST',
                        body: JSON.stringify({
                            "seatZone": seatZone
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error(response.body.message);
                            }
                            return response.json();
                        })
                        .catch((error) => {
                            console.log(error)
                            Swal.showValidationMessage(
                                `Request failed: ${error}`
                            )
                        })
                },
                allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log(result)
                }
            })
        } catch (err) {
            Swal.fire(
                'Error',
                e.message,
                'error'
            )
        }
    }

    const handleOnSetZone = () => {
        if (zone && selectedCells.length > 0) {
            const existingZoneIndex = seatZone.findIndex((zoneData) => zoneData.zone === zone);

            if (existingZoneIndex !== -1) {
                const updatedZones = [...seatZone];
                updatedZones[existingZoneIndex].cells = [
                    ...updatedZones[existingZoneIndex].cells,
                    ...selectedCells.map((cell) => ({
                        ...cell,
                        alphabetID: `${String.fromCharCode(cell.row + 97).toUpperCase()}${cell.col + 1}`,
                        isSold: false,
                    })),
                ];
                setSeatZone(updatedZones);
            } else {
                setSeatZone([
                    ...seatZone,
                    {
                        zone,
                        cells: selectedCells.map((cell) => ({
                            ...cell,
                            alphabetID: `${String.fromCharCode(cell.row + 97).toUpperCase()}${cell.col + 1}`,
                            isSold: false,
                        })),
                    },
                ]);
            }

            setZone('');
            setSelectedCells([]);
        }
    };


    const isCellInZone = (rowIndex, columnIndex) => {
        return seatZone.some(zoneData => {
            return zoneData.cells.some(cell => cell.row === rowIndex && cell.col === columnIndex);
        });
    };

    const renderTable = () => {
        const table = [];

        for (let i = 0; i < data.rows; i++) {
            const row = [];
            for (let j = 0; j < data.columns; j++) {
                const isCellSelected = selectedCells.some(
                    (selectedCell) => selectedCell.row === i && selectedCell.col === j
                );
                const isInZone = isCellInZone(i, j);

                row.push(
                    <td key={j} className={`border w-10 p-4 transition-colors duration-300 ${isInZone ? 'bg-red-200' : isCellSelected ? 'bg-blue-200 hover:bg-blue-300' : 'border-gray-300 hover:bg-gray-100 '}`} onClick={() => isInZone ? null : handleCellClick(i, j)}></td>
                );
            }
            table.push(
                <tr key={i} className="border border-gray-300 mb-2">
                    <td className='w-10 text-center h-8'>{String.fromCharCode(i + 97).toUpperCase()}</td>
                    {row}
                </tr>
            );
        }

        return table;
    };


    const renderHeadTable = () => {

        const headRow = [];
        for (let j = 0; j < data.columns; j++) {
            headRow.push(
                <th key={j} onClick={() => handleColumnClick(j)} className="border w-8 border-gray-300" >
                    {j + 1}
                </th>
            );
        }
        return (
            <tr>
                <th></th>
                {headRow}
            </tr>
        );
    };

    return (
        <main>
            <Head>
                <title>Admin | Lakorn PMD</title>
            </Head>
            <AdminNavbar />
            <div className="container mx-auto p-4 space-y-4">
                <form className="mb-4 flex flex-col md:flex-row items-center space-x-4">
                    {/* <label htmlFor="name" className="text-gray-700">Name:</label> */}
                    {/* <input type="text" name="name" min={0} value={data.name} onChange={handleOnChange} className=" p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-300" /> */}

                    <div className="flex m  d:flex-row my-2 md:my-0 items-center space-x-4">
                        <label htmlFor="rows" className="text-gray-700">Rows:</label>
                        <input type="number" name="rows" min={0} max={26} value={data.rows} onChange={handleOnChange} className="w-16 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-300" required />

                        <label htmlFor="columns" className="text-gray-700">Columns:</label>
                        <input type="number" name="columns" min={0} value={data.columns} onChange={handleOnChange} className="w-16 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-300" required />
                    </div>
                    <input type="button" onClick={() => setSelectedCells([])} className="p-2 w-full md:w-16 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-300 hover:cursor-pointer" value={'Reset'} />
                    <input type="button" onClick={() => handleOnSendToServer()} className="p-2 w-full md:w-20 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-300 hover:cursor-pointer" value={'Submit'} />
                </form>
                <form className="mb-4 flex flex-col md:flex-row items-center space-x-4">
                    <label htmlFor='zone'>Zone: </label>
                    <input type="text" name="zone" value={zone} onChange={(e) => setZone(e.target.value)} className="w-16 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-300" required />

                    <input type="button" onClick={handleOnSetZone} className="p-2 w-full md:w-16 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-300 hover:cursor-pointer" value={'Enter'} />

                </form>

                <div className="overflow-x-auto">
                    <table className="table-auto border border-gray-300 rounded-lg">
                        <thead>{renderHeadTable()}</thead>
                        <tbody>{renderTable()}</tbody>
                    </table>
                </div>
            </div>
        </main>
    );
};

export default DynamicTable;