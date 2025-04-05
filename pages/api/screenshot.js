const chromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "このエンドポイントはPOSTリクエストのみをサポートしています" });
  }

  const { url } = req.body;

  console.log("受け取ったURL:", url);
  if (!url || !url.startsWith("http")) {
    return res.status(400).json({ error: "有効なURLを入力してください" });
  }

  try {
    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    console.log("ページにアクセスしました:", url);

    const screenshotsDir = path.join(process.cwd(), "public", "screenshots");
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    const filename = `/tmp/screenshot-${Date.now()}.png`;
    await page.screenshot({ path: filename, fullPage: true });
    await browser.close();

    console.log("スクリーンショットを保存しました:", filename);

    res.json({
      message: "スクリーンショットを保存しました",
      filename,
    });
  } catch (error) {
    console.error("サーバーエラー:", error); // エラー内容をログに出力
    res.status(500).json({ error: "スクリーンショットの取得に失敗しました" });
  }
}