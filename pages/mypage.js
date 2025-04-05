import React from 'react';
import Link from 'next/link';

export default function Mypage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">マイページ</h1>
            <div className="flex flex-col gap-4">
                {/* 履歴画面へのリンク */}
                <Link href="/history" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        履歴を見る
                </Link>

                {/* ログアウト画面へのリンク */}
                <Link href="/logout" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                        ログアウト
                </Link>
            </div>
        </div>
    );
}