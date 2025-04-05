import { useState } from "react";
import { useRouter } from "next/router";  // ✅ useRouter をインポート
import { supabase } from "../lib/supabase";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();  // ✅ useRouter を使う

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage("ログインに失敗しました: " + error.message);
      return;
    }

    // ✅ ログイン成功時にホーム画面へ遷移
    router.push("/home");
  };


    return (
      <div className="h-screen sm:h-auto xs:h-auto flex lg:flex-row flex-col items-center justify-center bg-white  font-[family-name:var(--font-geist-sans)] w-full">
       <div className="lg:flex-1/2 flex-col flex items-center justify-center gap-4 h-screen  bg-white sm:pt-30 xs:pt-20 w-full">
        
        
       <div
      className="flex flex-col items-center justify-center w-full sm:w-auto"
      style={{
        backgroundColor: ' rgb(230, 242, 255)',
        borderRadius: '50%',
        width: '100%', // スマホでは幅を100%に
        maxWidth: '600px', // 最大幅
        height: 'auto', // 高さを自動調整
        maxHeight: '600px',
        display: 'flex', 
        aspectRatio: '1',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center', 
        padding: '20px', 
      }}>
          <div className="text-4xl lg:text-6xl font-bold mb-10" style={{ color: 'rgb(0, 115, 230)' }}>Tone Assist</div>
          <div className="text-lg lg:text-xl leading-relaxed w-100 font-semibold mb-4 lg:mb-5" style={{ color: 'rgb(0, 115, 230)',zIndex:10 }}>URLを入れると、そのサイトが色弱の人にも見やすいサイトかを評価します!</div>
          <div className="text-lg lg:text-xl font-semibold mb-4 lg:mb-5" style={{ color: 'rgb(0, 115, 230)',zIndex: 10}}>履歴で、過去の評価を遡ることもできるよ！</div>
          <div className="text-lg lg:text-xl font-semibold mb-4 lg:mb-5" style={{ color: 'rgb(0, 115, 230)' ,zIndex: 10}}>あなたの作ったサイトを誰にでも見やすいデザインにしよう！</div>
          <div className="text-lg lg:text-xl font-semibold" style={{ color: 'rgb(0, 115, 230)',zIndex: 10 }}>初めての方はユーザー登録からお願いします!</div>
                <div className="absolute bg-[rgb(230,242,255)] rounded-full w-30 h-30 -top-1 -left-3" ></div>
</div>
  </div>  
  
  
  <div className="lg:flex-1/2 flex-col flex items-center justify-center gap-4 h-screen sm:h-auto xs:h-auto bg-white px-4 sm:px-8 w-full">
    <Image
      src="/logo.png"
      alt="Logo"
      width={100}
      height={100}
      className="h-30 w-34 lg:mb-10 mb-6"
    />
    <form className="flex flex-col gap-4 w-full max-w-md rounded shadow-md p-6 sm:p-8 ">
      <div className="mb-4">
      <div className="text-3xl lg:text-5xl text-black p-10 font-bold m-4 " style={{color:'rgb(0, 115, 230)' }}>ログイン</div>
      <div className=" text-black m-2">メールアドレス</div>
        <input
          type="email"
          placeholder="メールアドレス"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          className="border border-black rounded p-2 placeholder-black w-full "
        /></div>
        <div className="mb-4">
        <div className="flex items-center  text-black m-2">パスワード</div>
        <input
          type="password"
          placeholder="パスワード"
          className="border border-black rounded px-4 py-2  placeholder-black w-full text-black"
          /></div>
        <div className="font-semibold hover:underline" style={{ color: 'rgb(0, 115, 230)' }}><Link href="/signup">登録</Link></div>
        
          <button type="submit" className="py-2 px-4 rounded hover:bg-blue-900 items-center" style={{backgroundColor:'rgb(0, 115, 230)'}}><Link href="/home" className="text-white">ログイン
        </Link></button>
      </form>
    </div>
  </div>
    );
  }
