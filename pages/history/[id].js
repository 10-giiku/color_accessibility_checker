import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabase';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function HistoryDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [publicImageUrl, setPublicImageUrl] = useState(null); // 追加

  useEffect(() => {
    if (!id) return;
    async function fetchDetail() {
      const { data, error } = await supabase
        .from('history_checks')
        .select('*')
        .eq('id', id)
        .single();
      if (!error) {
        setRecord(data);

        if (data.image_url) {
          const { data: imageData } = supabase
            .storage
            .from('api-get-image') // バケット名（必要に応じて変更してね）
            .getPublicUrl(data.image_url);

          setPublicImageUrl(imageData.publicUrl);
        }
      }
      setLoading(false);
    }
    fetchDetail();
  }, [id]);

  const formatDate = (ts) => {
    const d = new Date(ts);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}/${mm}/${dd}`;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-6 bg-gray-50">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">詳細情報</h1>
        {loading ? (
          <p className="text-center text-lg">読み込み中...</p>
        ) : record ? (
          <div className="border rounded-lg p-6 shadow bg-white">
            <p className="mb-2">日付: {formatDate(record.created_at)}</p>
            <p className="mb-4">
              URL: <a href={record.url} target="_blank" className="text-blue-600 hover:underline" rel="noopener noreferrer">{record.url}</a>
            </p>
            <div className="mb-6">
              <h2 className="font-semibold text-lg mb-2">読み取り画像</h2>
              {publicImageUrl ? (
                <img src={publicImageUrl} alt="Site snapshot" className="w-full h-auto rounded" />
              ) : (
                <p className="text-gray-500">画像がありません。</p>
              )}
            </div>
            <div>
              <h2 className="font-semibold text-lg mb-2">評価</h2>
              <p>{record.evaluation || '評価がありません'}</p>
            </div>
          </div>
        ) : (
          <p className="text-center text-red-500">データが見つかりませんでした。</p>
        )}
      </main>
      <Footer />
    </div>
  );
}
