import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';

export async function getStaticProps() {
    const fs = require('fs');
    const path = require('path');

    // screenshotsフォルダのパス
    const screenshotsDir = path.join(process.cwd(), 'public', 'tmp');

    // フォルダが存在しない場合は空の配列を返す
    let images = [];
    if (fs.existsSync(screenshotsDir)) {
        const files = fs.readdirSync(screenshotsDir);

        // 画像ファイルのみをフィルタリング
        images = files.filter((file) => /\.(png|jpg|jpeg|gif)$/i.test(file));
    }

    // ファイルの作成日時でソートして最新の1枚を取得
    const latestImage = images
        .map((file) => ({
            file,
            time: fs.statSync(path.join(screenshotsDir, file)).mtime.getTime(),
        }))
        .sort((a, b) => b.time - a.time)[0]?.file; // 最新のファイルを取得

    return {
        props: {
            image: latestImage || null, // 最新の画像がない場合は null を返す
        },
    };
}

export default function Confirmation({ image }) {
    const [imageStyle, setImageStyle] = useState({});
    const [boxDimensions, setBoxDimensions] = useState({ width: 0, height: 0 });
    const [url, setUrl] = useState('');
    const [report, setReport] = useState(null);

    useEffect(() => {
        // スクリーンサイズを取得して更新する関数
        const updateDimensions = () => {
            let boxWidth = document.documentElement.clientWidth; // 現在のスクリーン横幅
            if (boxWidth > 800) {
                boxWidth = 800; // 最大横幅を800pxに制限
            }
            let boxHeight = boxWidth * 0.5; // 箱の高さを横幅の50%に設定
            setBoxDimensions({ width: boxWidth, height: boxHeight });
        };

        // 初期値を設定
        updateDimensions();

        // リサイズイベントを監視
        window.addEventListener('resize', updateDimensions);

        // クリーンアップ関数でイベントリスナーを削除
        return () => {
            window.removeEventListener('resize', updateDimensions);
        };
    }, []);

    const handleImageLoad = (img) => {
        const imgWidth = img.naturalWidth; // 画像の元の横幅を取得
        const imgHeight = img.naturalHeight; // 画像の元の高さを取得

        // 箱の横幅に合わせて画像を拡大縮小
        const scale = boxDimensions.width / imgWidth;
        setImageStyle({
            width: `${imgWidth * scale}px`,
            height: `${imgHeight * scale}px`,
        });
    };

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

    return (
        <div className='flex flex-col min-h-screen bg-white'>
            <Header  className="fixed top-0 left-0 w-full z-10 bg-white shadow-md"/>
            <div className="flex-grow pt-16 pb-16 p-4 overflow-y-auto text-center">
                <h1 className='text-4xl font-bold pb-3 text-black'>最近アップロードされたスクリーンショット</h1>
                {image ? (
                    <div
                        style={{
                            width: `${boxDimensions.width}px`, // 箱の横幅を設定
                            height: `${boxDimensions.height}px`, // 箱の高さを設定
                            border: '1px solid #ccc', // 枠線を追加
                            borderRadius: '8px', // 角を丸くする
                            overflowY: 'auto', // 縦方向のスクロールを有効化
                            overflowX: 'hidden', // 横方向のスクロールを無効化
                            margin: '0 auto', // 中央揃え
                            backgroundColor: '#f9f9f9', // 背景色を追加
                            position: 'relative', // 相対位置を設定
                            padding: '0', // パディングをリセット
                            boxSizing: 'border-box', // ボックスサイズを正確に計算
                        }}
                    >
                        <img
                            src={`/screenshots/${image}`}
                            alt="Latest Screenshot"
                            style={{
                                ...imageStyle,
                                display: 'block',
                                margin: '0',
                                padding: '0',
                                border: 'none',
                            }}
                            onLoad={(e) => handleImageLoad(e.target)} // 画像読み込み完了時に横幅を取得
                        />
                    </div>
                ) : (
                    <div className='font-bold text-3xl text-black'>画像が見つかりませんでした。</div>
                )}
            
    <div>
      <h1 className='m-10 font-bold text-3xl' >ウェブページのアクセシビリティチェック</h1>
 
                 {report && (
        <div>
          <h2>チェック結果</h2>
          <p>アクセシビリティスコア: {report.accessibilityScore}</p>
          <p>背景色: {report.backgroundColor}</p>
        </div>
      )}</div>
            </div>
            <Footer className="fixed bottom-0 left-0 w-full z-10 bg-white shadow-md"/>
        </div>
    );
}
