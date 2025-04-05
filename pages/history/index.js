import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabase';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function History() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      const { data, error } = await supabase
        .from('history_checks')
        .select('id, url, created_at')
        .order('created_at', { ascending: false });
      if (!error) setRecords(data);
      setLoading(false);
    }
    fetchHistory();
  }, []);

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
        <h1 className="text-3xl font-bold text-blue-700 mb-6">履歴一覧</h1>
        {loading ? (
          <p className="text-center text-lg">読み込み中...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {records.map((rec) => (
              <div key={rec.id} className="border rounded-lg p-4 shadow hover:shadow-lg bg-white">
                <p className="text-gray-700 mb-2">日付: {formatDate(rec.created_at)}</p>
                <p className="text-blue-600 break-all mb-4">{rec.url}</p>
                <Link href={`/history/${rec.id}`}>  
                  <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    詳細を見る
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}