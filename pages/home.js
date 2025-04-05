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
    <div className="flex flex-col min-h-screen bg-white">
        
        <div className="flex-grow">
            <Header/>
            <div className="flex-grow p-4">
                {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-xl font-bold">解析中です。お待ちください...</p>
                    </div>
                ) : (
            <><div className='text-black'>下記のBoxにURlを貼り付けてください</div>
                <form onSubmit={handleSubmit} color={{ color: 'rgb(30, 100, 175)', backgroundColor: 'rgb(255, 255, 255)' }} className='border-radius: 8px mt-16 ' >
                    <input
                        type="text"
                        placeholder="URLを入力"
                        className='border-radius: 8px;'
                        style={{ width: '300px', padding: '8px', color:'black ', border: '1px solid rgb(30, 100, 175)' }}
                    />
                    <Link href="/confirmation"><button type="submit" style={{ marginLeft: '10px', padding: '8px' ,color:'rgb(255, 255, 255)', backgroundColor: 'rgb(30, 100, 175)', borderRadius: '4px' }}>
                        送信
                    </button></Link>
                </form></>
                )}
            </div>
        </div>
        <Footer className="mt-auto"/>
    </div>
    );
}