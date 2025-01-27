"use client"

import { useState } from "react"

export default function Form() {

    const [receiptName, setReceiptName] = useState<string>("")
    const [purpose, setPurpose] = useState('');
    const [points, setPoints] = useState('');
    const [generated, setGenerated] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!receiptName || !purpose || !points) {
                return alert("Fields are requied to fill!!")
            }
            const res = await fetch("http://localhost:8000/generate-email/", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ receiptName, purpose, points })
            })
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            setGenerated(data.email);

        } catch (err: any) {
            console.error('Error generating email:', err);
        }
    }
    return <div className=" p-12 mt-28 border max-w-fit mx-auto mb-2 rounded-md">

        <div className="text-center text-3xl py-8 font-bold">Email Generator</div>
        <div className="">
            <input
                value={receiptName}
                onChange={(e) => setReceiptName(e.target.value)}
                className="w-full border text-slate-900 border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-900"
                placeholder="Name"
            />
        </div>
        <div className="mt-4">
            <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                required
                className="w-full border text-slate-900 border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
                <option value="" disabled className="text-slate-500">
                    Select Purpose
                </option>
                <option value="Meeting Request" className="text-slate-900">
                    Meeting Request
                </option>
                <option value="Follow Up" className="text-slate-900">
                    Follow Up
                </option>
                <option value="Thank You" className="text-slate-900">
                    Thank You
                </option>
            </select>
        </div>

        <div className="mt-4">
            <textarea
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                placeholder="Key Points"
                required
                className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 resize-none text-slate-900"
                rows={3}
            />
        </div>
        <div
            className="inline-block bg-blue-500 text-white font-semibold text-center py-2 px-4 rounded-lg shadow-md transition-all duration-200 cursor-pointer hover:bg-blue-600 active:bg-blue-700 active:scale-95"
            onClick={handleSubmit}
        >
            Submit
        </div>
        <div className="mt-4">
            {generated && (
                <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-xl w-full">
                    <div className="text-xl font-semibold mb-4">Generated Email:</div>
                    <div className="bg-gray-900 text-gray-300 p-4 rounded-lg whitespace-pre-wrap">
                        {generated}
                    </div>
                </div>
            )}
        </div>
    </div>

}