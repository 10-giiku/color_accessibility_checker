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
    <div className="  h-screen flex items-center justify-items-center bg-white  font-[family-name:var(--font-geist-sans)]">
    <div className="flex-1 flex-col flex items-center justify-center gap-4 h-screen">
     
     
    <div
   className="flex flex-col items-center justify-center"
   style={{
       backgroundColor: ' rgb(230, 242, 255)',
       borderRadius: '50%',
       width: '700px',
       height: '700px', 
       display: 'flex', 
       alignItems: 'center',
       justifyContent: 'center',
       textAlign: 'center', 
       padding: '20px', 
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
              className="h-30 w-34 mb-5 mr-10"
            />
        
        <form className="flex flex-col gap-4 w-96 rounded shadow-md p-8"
          onSubmit={handleSubmit}
        >
          <div className="text-5xl text-black p-10 font-bold" style={{color:'rgb(0, 115, 230)' }}>Sign Up</div>
          <div className="mb-4">       
          <div className="mb-2 text-black">メールアドレス</div>
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border text-black border-black rounded p-2 placeholder-black w-full"
            required
          /></div>   
          <div className="mb-4">
          <div className="flex items-center  text-black mb-2">パスワード</div>
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border text-black border-black rounded px-4 py-2  placeholder-black w-full"
            required
          /></div>
          <div className="mb-4">
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
          <div className="mb-4">
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
