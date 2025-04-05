import { useState } from "react";
import React from "react";
import Image from "next/image";
import { supabase } from "../lib/supabase";
import Link from "next/link";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // フォームのデフォルト動作を防ぐ

    if (password !== confirmPassword) {
      setErrorMessage("確認用のパスワードが一致しません");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("パスワードは6文字以上である必要があります");
      return;
    }

    setErrorMessage("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      setSuccessMessage("登録が完了しました！確認メールをチェックしてください。");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="h-screen sm:h-auto xs:h-auto flex lg:flex-row flex-col items-center justify-center bg-white  font-[family-name:var(--font-geist-sans)] w-full sm:pt-10 xs:pt-10">
    <div className="lg:flex-1/2 flex-col flex items-center justify-center gap-4 h-screen  bg-white sm:pt-30 xs:pt-20 w-full  ">
     
     
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
       alignItems: 'center',
       aspectRatio: '1',
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


      <div className="lg:flex-1/2 flex-col flex items-center justify-center gap-4 h-screen sm:h-auto  bg-white px-4 sm:px-8 w-full">
        <Image
              src="/logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="h-30 w-32 lg:mb-4 mb-3"
            />
        
        <form className="flex flex-col gap-4 w-96 rounded shadow-md p-8"
          onSubmit={handleSubmit}
        >
          <div className="text-3xl lg:text-5xl text-black p-5 font-bold" style={{color:'rgb(0, 115, 230)' }}>アカウント新規作成</div>
          <div className="mb-3">       
          <div className="mb-2 text-black">メールアドレス</div>
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border text-black border-black rounded p-2 placeholder-black w-full"
            required
          /></div>   
          <div className="mb-3">
          <div className="flex items-center  text-black mb-2">パスワード</div>
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border text-black border-black rounded px-4 py-2  placeholder-black w-full"
            required
          /></div>
          <div className="mb-3">
          <div className="flex items-center  text-black mb-2">パスワード（確認用）</div>
          <input
            type="password"
            placeholder="パスワード（確認用）"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border text-black border-black rounded px-4 py-2  placeholder-black w-full"
            required
          /></div>
          <div className="text-blue-600 font-semibold hover:underline"><Link href="/signup">← Sign In</Link></div>
          <div className="mb-3">
          {errorMessage && (
            <div className="text-red-500 text-sm">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="text-green-500 text-sm">{successMessage}</div>
          )}</div>
          <button
            type="submit"
            className="py-2 px-4 rounded hover:bg-blue-900 items-center text-white" style={{backgroundColor:'rgb(0, 115, 230)'}}
          >
            アカウント作成
          </button>
        </form>
      </div>
    </div>
  );
}
