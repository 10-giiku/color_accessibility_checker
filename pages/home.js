import React from 'react';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function Home() {
    const [url, setUrl] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const res = await fetch('/api/home', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        })

        const data = await res.json()
        setMessage(data.message)
    }
    return(<div className="flex flex-col min-h-screen">
        
<div className="flex-grow"><Header/>
<form onSubmit={handleSubmit} style ={{ display: "mt-4", alianItems: "font-bold"}}>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="URLを入力"
                        style={{ width: '300px', padding: '8px' }}
                    />
                    <button type="submit" style={{ marginLeft: '10px', padding: '8px' }}>
                        {/*<Link href="/confirmation">送信</Link>*/}送信
                    </button>
                </form>

        </div><Footer className="mt-auto"/>
        </div>
    )
}