import React from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Mypage() {
    return (<div>
        <Header/>
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <h1 className="text-5xl font-bold m-8" style={{color:'rgb(0, 115, 230)' }}>マイページ</h1>
            <div className="flex flex-col gap-4">
            <nav className="border p-4"><ui className="flex flex-col gap-4">
                <li><Link href="/history" className="px-4 py-2 bg-white text-black rounded">
                        履歴を見る
                </Link></li><li>
                <Link href="/logout" className="px-4 py-2 bg-white text-black rounded">
                        ログアウト
                </Link></li></ui></nav>
            </div>
        </div><Footer/></div>
    );
}
