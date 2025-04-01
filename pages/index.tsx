import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="  h-screen flex items-center justify-items-center p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
     <div className="flex-1 flex-col flex items-center justify-center gap-4 bg-white h-screen">
      
      <div >
        <Image
          src="/logo.png"
          alt="Logo"
          width={100}
          height={100}
          className="h-20 w-20"
        />
        </div>
        <h1 className="text-4xl font-bold text-blue-300">Color Accessibility Checker</h1>
        <h2 className="text-xl text-blue-900">色覚バリアフリー チェッカー</h2>
      </div>



      <div className="flex-1  flex-col flex items-center justify-center  bg-yellow-100 h-screen">
      <div className="text-5xl text-black p-10">ログイン</div>
      <form className="flex flex-col gap-4 w-80 ">
      <div className="flex items-center gap-2 text-black">メールアドレス</div>
          <input
            type="email"
            placeholder="メールアドレス"
            className="border border-black rounded px-4 py-2"
          />
          <div className="flex items-center gap-2 text-black">パスワード</div>
          <input
            type="password"
            placeholder="パスワード"
            className="border border-black rounded px-4 py-2"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            ログイン
          </button>
        </form>
      </div>
    </div>
  );
}
