import { useState } from "react";
import React from "react";
import Image from "next/image";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // フォームのデフォルト動作を防ぐ

    if (password !== confirmPassword) {
      setErrorMessage("確認用のパスワードが一致しません");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("パスワードは6文字以上である必要があります");
      return;
    }

    setErrorMessage(""); // エラーがない場合はリセット
    // アカウント作成処理をここに追加
    console.log("アカウント作成成功");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="flex-1 flex-col flex items-center justify-center gap-4 h-screen">
        <div>
          <Image
            src="/logo.png"
            alt="Logo"
            width={100}
            height={100}
            className="h-30 w-34"
          />
        </div>
        <h1 className="text-4xl font-bold" style={{ color: "rgb(30, 100, 175)" }}>
          Tone Assist
        </h1>
        <h2 className="text-xl" style={{ color: "rgb(30, 100, 175)" }}>
          色覚バリアフリー チェッカー
        </h2>
      </div>
      <div className="flex-1 flex-col flex items-center justify-center bg-yellow-100 h-screen">
        <div className="text-5xl text-black p-10">Sign Up</div>
        <form
          className="flex flex-col gap-4 w-80 p-6 rounded" // shadow-md 使ってもよさそう
          onSubmit={handleSubmit}
        >
          <div className="flex items-center gap-2 text-black">メールアドレス</div>
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2"
            required
          />
          <div className="flex items-center gap-2 text-black">パスワード</div>
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2"
            required
          />
          <div className="flex items-center gap-2 text-black">パスワード（確認用）</div>
          <input
            type="password"
            placeholder="パスワード（確認用）"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2"
            required
          />
          {errorMessage && (
            <div className="text-red-500 text-sm">{errorMessage}</div>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            アカウント作成
          </button>
        </form>
      </div>
    </div>
  );
}