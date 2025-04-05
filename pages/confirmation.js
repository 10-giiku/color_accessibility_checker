import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';

export default function Confirmation() {
    const [imageUrl, setImageUrl] = useState(null);
    const [imageStyle, setImageStyle] = useState({});
    const [boxDimensions, setBoxDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateDimensions = () => {
            let boxWidth = document.documentElement.clientWidth;
            if (boxWidth > 800) boxWidth = 800;
            const boxHeight = boxWidth * 0.5;
            setBoxDimensions({ width: boxWidth, height: boxHeight });
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    useEffect(() => {
        // Supabaseから最新の1件を取得
        async function fetchLatestImage() {
            const { data, error } = await supabase
                .from('history_checks')
                .select('image_url')
                .order('created_at', { ascending: false })
                .limit(1)
                .single();

            if (!error && data?.image_url) {
                setImageUrl(data.image_url);
            } else {
                console.error('画像の取得に失敗:', error);
            }
        }
        fetchLatestImage();
    }, []);

    const handleImageLoad = (img) => {
        const scale = boxDimensions.width / img.naturalWidth;
        setImageStyle({
            width: `${img.naturalWidth * scale}px`,
            height: `${img.naturalHeight * scale}px`,
        });
    };

    return (
        <div>
            <Header />
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ padding: '20px' }}>最近アップロードされたスクリーンショット</h1>
                {imageUrl ? (
                    <div
                        style={{
                            width: `${boxDimensions.width}px`,
                            height: `${boxDimensions.height}px`,
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            overflowY: 'auto',
                            overflowX: 'hidden',
                            margin: '0 auto',
                            backgroundColor: '#f9f9f9',
                            position: 'relative',
                            padding: '0',
                            boxSizing: 'border-box',
                        }}
                    >
                        <img
                            src={imageUrl}
                            alt="Latest Screenshot"
                            style={{
                                ...imageStyle,
                                display: 'block',
                                margin: '0',
                                padding: '0',
                                border: 'none',
                            }}
                            onLoad={(e) => handleImageLoad(e.target)}
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
