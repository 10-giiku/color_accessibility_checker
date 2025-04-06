import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';
import Link from 'next/link';

export default function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <header
      className="flex items-center justify-between p-4 bg-gray-800 text-white"
      style={{ backgroundColor: 'rgb(230, 242, 255)' }}
    >
      <h1 className="text-2xl font-bold" style={{color:'rgb(0, 115, 230)'}}>
        <Link href="/home">Tone Assist</Link>
      </h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href="/mypage" className="hover:underline mr-10 font-semibold" style={{color:'rgb(0, 115, 230)'}}>
              Mypage
            </Link>
            <button onClick={handleLogout} className="hover:underline ml-4">
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
