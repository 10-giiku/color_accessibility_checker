export default function handler(req, res) {
    if (req.method === 'POST') {
      const { url } = req.body
  
      console.log('受け取ったURL:', url)
  
      // ここでDBに保存したり、別の処理もできる
      res.status(200).json({ message: `URLを受け取りました: ${url}` })
    } else {
      res.status(405).json({ message: 'POSTメソッドのみ対応しています' })
    }
  }
  