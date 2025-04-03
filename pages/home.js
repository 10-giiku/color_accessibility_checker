import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function Home() {
    return(<div className="flex flex-col min-h-screen">
        
<div className="flex-grow"><Header/>
<form >
                    <input
                        type="text"
                        placeholder="URLを入力"
                        style={{ width: '300px', padding: '8px' }}
                    />
                    <button type="submit" style={{ marginLeft: '10px', padding: '8px' }}>
                        <Link href="/confirmation">送信</Link>
                    </button>
                </form>

        </div><Footer className="mt-auto"/>
        </div>
    )
}