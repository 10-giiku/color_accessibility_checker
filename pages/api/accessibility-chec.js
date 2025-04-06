import puppeteer from 'puppeteer';
import chromeLauncher from 'chrome-launcher';
import lighthouse from 'lighthouse';

export default async function handler(req, res) {
  const { url } = req.query;  // クエリパラメータから URL を取得

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    // Puppeteerでスクリーンショットを取得
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);

    // スクリーンショットを保存
    await page.screenshot({ path: 'screenshot.png' });

    // ページ内の背景色を取得
    const backgroundColor = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });

    console.log(`Background color: ${backgroundColor}`);

    // Puppeteer 終了
    await browser.close();

    // Lighthouse でアクセシビリティチェック
    const chrome = await chromeLauncher.launch({
      chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox'],
    });

    const options = { port: chrome.port };
    const runnerResult = await lighthouse(url, options);
    const reportJson = runnerResult.lhr;  // Lighthouse レポート

    const accessibilityScore = reportJson.categories.accessibility.score * 100;

    // レポートデータをJSONとして返す
    res.status(200).json({
      accessibilityScore,
      backgroundColor,
      report: reportJson,
    });

    // Chrome 終了
    await chrome.kill();
  } catch (error) {
    console.error('Error during accessibility check:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
