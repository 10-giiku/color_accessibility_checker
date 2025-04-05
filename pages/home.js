import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {

    const [isLoading, setIsLoading] = useState(false); 
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); 

        try {
            // APIリクエストを送信（例）
            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: 'example' }),
            });

            const result = await response.json();
            console.log('解析結果:', result);
            router.push('/confirmation');
        
        } catch (error) {
            console.error('エラーが発生しました:', error);
        
        } finally {
            setIsLoading(false); 
        }
    };

    return(
    <div className="flex flex-col min-h-screen">
        
        <div className="flex-grow">
            <Header/>
            <div className="flex-grow p-4">
                {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-xl font-bold">解析中です。お待ちください...</p>
                    </div>
                ) : (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="URLを入力"
                        style={{ width: '300px', padding: '8px' }}
                    />
                    <button type="submit" style={{ marginLeft: '10px', padding: '8px' }}>
                        <Link href="/confirmation">送信</Link>
                    </button>
                </form>
                )}
            </div>
        </div>
        <Footer className="mt-auto"/>
    </div>
    );
}
