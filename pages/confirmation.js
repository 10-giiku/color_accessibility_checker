import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';

export async function getStaticProps() {
    const fs = require('fs');
    const path = require('path');

    // screenshotsフォルダのパス
    const screenshotsDir = path.join(process.cwd(), 'public', 'screenshots');

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

    const handleImageLoad = (e) => {
        const imgWidth = e.target.naturalWidth; // 画像の元の横幅を取得
        const imgHeight = e.target.naturalHeight; // 画像の元の高さを取得

        // 箱の横幅に合わせて画像を拡大縮小
        const scale = Math.min(boxDimensions.width / imgWidth, boxDimensions.height / imgHeight);
        setImageStyle({
            width: `${imgWidth * scale}px`,
            height: `${imgHeight * scale}px`,
        });
    };

    return (
        <div>
            <Header />
            <div style={{ textAlign: 'center'}}>
                <h1 style={{padding: '20px'}}>最近アップロードされたスクリーンショット</h1>
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
                        <Image
                            src={`/screenshots/${image}`}
                            alt="Latest Screenshot"
                            width={boxDimensions.width} // 必要に応じて幅を指定
                            height={boxDimensions.height} // 必要に応じて高さを指定
                            style={{
                                ...imageStyle,
                                display: 'block',
                                margin: '0',
                                padding: '0',
                                border: 'none',
                            }}
                            onLoadingComplete={handleImageLoad} // 画像読み込み完了時に横幅を取得
                        />
                    </div>
                ) : (
                    <p>画像が見つかりませんでした。</p>
                )}
            </div>
            <Footer />
        </div>
    );
}
