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
    <div className="h-screen flex items-center justify-center font-sans">
      <div className="flex-1 flex flex-col items-center justify-center gap-4 bg-white h-screen">
        <Image src="/logo.png" alt="Logo" width={100} height={100} />
        <h1 className="text-4xl font-bold text-blue-700">Tone Assist</h1>
        <h2 className="text-xl text-blue-700">色覚バリアフリー チェッカー</h2>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center bg-yellow-100 h-screen">
        <form className="flex flex-col gap-4 w-80 p-6 rounded">  {/* shadow-md を追加してもいいかも */}
          <div className="text-5xl text-black p-10">Sign In</div>

          <label className="text-black">メールアドレス</label>
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 rounded px-4 py-2"
          />

          <label className="text-black">パスワード</label>
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-300 rounded px-4 py-2"
          />

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          <Link href="/signup" className="text-blue-600">Sign Up</Link>

          <button type="submit" onSubmit={handleLogin} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
