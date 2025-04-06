import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {

    const [isLoading, setIsLoading] = useState(false); 
    const router = useRouter();
    const [url, setUrl] = useState('');
    const [report, setReport] = useState(null);
  
    const handleUrlChange = (e) => {
      setUrl(e.target.value);
    };
  
    const handleCheckAccessibility = async () => {
      try {
        const res = await fetch(`/api/accessibility-check?url=${encodeURIComponent(url)}`);
        const data = await res.json();
  
        if (res.ok) {
          setReport(data);
        } else {
          console.error(data.error);
          setReport(null);
        }
      } catch (error) {
        console.error('Error:', error);
        setReport(null);
      }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log('送信するURL:', url);

        try {

            await handleCheckAccessibility();
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
                        <p className="text-xl font-bold text-black">解析中です。お待ちください...</p>
                    </div>
                ) : (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="URLを入力"
                        value={url}
                        onChange={handleUrlChange}
                        required
                        style={{ width: '300px', padding: '8px' }}
                        className=''
                    />
                    <button type="submit" disabled={isLoading} style={{ marginLeft: '10px', padding: '8px' }}>
                        {isLoading ? '処理中...' : '送信'}
                    </button>
                </form>
                )}
            </div>
        </div>
        <Footer className="fixed bottom-0 left-0 w-full z-10 bg-white shadow-md"/>
    </div>
    );
}
