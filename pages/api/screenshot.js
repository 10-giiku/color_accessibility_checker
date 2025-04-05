const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "このエンドポイントはPOSTリクエストのみをサポートしています" });
  }

  const { url } = req.body;

  // URLの表示
  console.log('受け取ったURL:', url)
  if (!url || !url.startsWith("http")) {
    return res.status(400).json({ error: "有効なURLを入力してください" });
  }

  try {
    const browser = await puppeteer.launch({
      headless: true, // ヘッドレスモードを有効化
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // 起動オプションを追加, フォント設定を有益化
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    console.log("ページにアクセスしました:", url);

    const screenshotsDir = path.join(process.cwd(), "public", "screenshots");
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    const filename = `screenshot-${Date.now()}.png`;
    const filepath = path.join(screenshotsDir, filename);

    await page.screenshot({ path: filepath, fullPage: true });
    await browser.close();

    console.log("スクリーンショットを保存しました:", filepath);

    res.json({
      message: "スクリーンショットを保存しました",
      filename,
    });
  } catch (error) {
    console.error("サーバーエラー:", error); // エラー内容をログに出力
    res.status(500).json({ error: "スクリーンショットの取得に失敗しました" });
  }
}