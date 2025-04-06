import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {

    const [isLoading, setIsLoading] = useState(false); 
    const [url, setUrl] = useState(''); // URL入力用のステートを追加
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log('送信するURL:', url);

        try {
            const response = await fetch('/api/screenshot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url }), // URLを送信
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTPエラー: ${response.status}`);
            }

            const result = await response.json();
            console.log('解析結果:', result);
            router.push('/confirmation'); // 成功時に /confirmation へ遷移
        } catch (error) {
            console.error('エラーが発生しました:', error);
            alert(`エラーが発生しました: ${error.message}`);
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
            <>
                <div className='text-black'>下記のBoxにURlを貼り付けてください</div>
                    <form onSubmit={handleSubmit} style={{ color: 'rgb(30, 100, 175)', backgroundColor: 'rgb(255, 255, 255)' }} className='border-radius: 8px mt-16 ' >
                        <input
                            type="text"
                            placeholder="URLを入力"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)} // URL入力を更新
                            required
                            style={{ width: '300px', padding: '8px', color:'black ', border: '1px solid rgb(30, 100, 175)' }}
                        />
                    <button type="submit" disabled={isLoading} style={{ marginLeft: '10px', padding: '8px' ,color:'rgb(255, 255, 255)'}}>
                        {isLoading ? '処理中...' : '送信'}
                    </button>
                </form>

          <>    )}
           
        </div>
        <Footer className="mt-auto"/></div>
    </div>
    );
}
