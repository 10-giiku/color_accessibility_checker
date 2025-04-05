import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { useState,useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [email, setEmail] = useState("");
  const [IsEmailValid, setIsEmailValid] = useState(false);
  useEffect(() => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setIsEmailValid(emailRegex.test(email));
  }, [email]);
  
  return (
    <div className="  h-screen flex items-center justify-items-center bg-white  font-[family-name:var(--font-geist-sans)]">
     <div className="flex-1 flex-col flex items-center justify-center gap-4 h-screen">
      
      
     <div
    className="flex flex-col items-center justify-center"
    style={{
        backgroundColor: ' rgb(230, 242, 255)', // 水色の背景
        borderRadius: '50%', // 丸くする
        width: '700px', // 丸の幅
        height: '700px', // 丸の高さ
        display: 'flex', // 子要素を中央揃え
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center', // テキストを中央揃え
        padding: '20px', // 内側の余白
    }}>
      <div className="absolute bg-[rgb(230,242,255)] rounded-full w-30 h-30 -top-1 -left-3"></div>
        <div className="text-6xl font-bold mb-10" style={{ color: 'rgb(0, 115, 230)' }}>Tone Assist</div>
        <div className="text-xl leading-relaxed w-100 font-semibold mb-5" style={{ color: 'rgb(0, 115, 230)' }}>URLを入れると、そのサイトが色弱の人にも見やすいサイトかを評価します!</div>
        <div className="text-xl font-semibold mb-5" style={{ color: 'rgb(0, 115, 230)' }}>履歴で、過去の評価を遡ることもできるよ！</div>
        <div className="text-xl font-semibold mb-5" style={{ color: 'rgb(0, 115, 230)' }}>あなたの作ったサイトを誰にでも見やすいデザインにしよう！</div>
        <div className="text-xl font-semibold" style={{ color: 'rgb(0, 115, 230)' }}>初めての方はユーザー登録からお願いします!</div>
      </div>
</div>  


<div className="flex-1 flex-col flex items-center justify-center h-screen">
  <Image
    src="/logo.png"
    alt="Logo"
    width={100}
    height={100}
    className="h-30 w-34 mb-10 mr-10"
  />
  <form className="flex flex-col gap-4 w-96 rounded shadow-md p-8">
    <div className="mb-4">
    <div className="text-5xl text-black p-10 font-bold" style={{color:'rgb(0, 115, 230)' }}>Sign In</div>
    <div className=" text-black m-2">メールアドレス</div>
      <input
        type="email"
        placeholder="メールアドレス"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
        className="border border-black rounded p-2 placeholder-black w-full"
      /></div>
      <div className="mb-4">
      <div className="flex items-center  text-black m-2">パスワード</div>
      <input
        type="password"
        placeholder="パスワード"
        className="border border-black rounded px-4 py-2  placeholder-black w-full"
        /></div>
      <div className="text-blue-600 font-semibold hover:underline"><Link href="/signup">Sign Up</Link></div>
      
        <button type="submit" className="   py-2 px-4 rounded hover:bg-blue-900 items-center" style={{backgroundColor:'rgb(0, 115, 230)'}}><Link href="/home" className="text-white">Sign In
      </Link></button>
    </form>
  </div>
</div>
  );
}
