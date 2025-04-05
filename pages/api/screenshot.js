import chromium from 'chrome-aws-lambda';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "このエンドポイントはPOSTリクエストのみをサポートしています" });
  }

  const { url } = req.body;
  console.log('受け取ったURL:', url);
  if (!url || !url.startsWith("http")) {
    return res.status(400).json({ error: "有効なURLを入力してください" });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: "Supabase の設定が不足しています" });
  }
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    await page.waitForSelector("body");

    const pageText = await page.evaluate(() => document.body.innerText);
    const screenshotBuffer = await page.screenshot({ fullPage: true });
    await browser.close();

    const bucketName = "api-get-image";
    const filename = `screenshot-${Date.now()}.png`;

    const { error: uploadError } = await supabase
      .storage
      .from(bucketName)
      .upload(filename, screenshotBuffer, {
        contentType: "image/png",
        upsert: false,
      });

    if (uploadError) {
      console.error("Supabase upload error:", uploadError);
      return res.status(500).json({ error: "スクリーンショットのアップロードに失敗しました" });
    }

    // ✅ 公開URL取得 → image_url に入れる
    const {
      data: { publicUrl: image_url },
      error: publicUrlError,
    } = supabase.storage.from(bucketName).getPublicUrl(filename);

    if (publicUrlError || !image_url) {
      console.error("Supabase public URL error:", publicUrlError);
      return res.status(500).json({ error: "アップロードしたファイルのURL取得に失敗しました" });
    }

    // ✅ テーブルの image_url カラムに正しく保存
    const { error: insertError } = await supabase
      .from('history_checks')
      .insert({
        url,
        image_url, // ← カラム名に合わせてOK
        evaluation: pageText,
      });

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return res.status(500).json({ error: "データベースへの記録に失敗しました" });
    }

    res.status(200).json({
      message: "スクリーンショットを取得・アップロードし、履歴に保存しました",
      screenshotUrl: image_url,
      evaluation: pageText,
    });
  } catch (error) {
    console.error("スクリーンショット取得エラー:", error);
    res.status(500).json({ error: "スクリーンショットの取得に失敗しました" });
  }
}
