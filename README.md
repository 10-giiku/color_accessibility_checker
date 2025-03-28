# Next.js Project

This is a Next.js project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## 🚀 Getting Started

### ▶️ Run with Docker (Recommended)
If you prefer to use Docker, follow these steps:

1. Build and start the container  
   ```
   docker compose up --build
   ```
2. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

To stop the container, run:
```
docker compose down
```

---

### ▶️ Run Locally (Without Docker)
First, install dependencies:
```
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, start the development server:
```
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

API routes can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

---

## 🛠 Docker Commands Overview

### 👀 それぞれのコマンドの違い

| コマンド | 役割 |
|---------|------------------------------------------------|
| `docker compose build` | Dockerfileからイメージをビルドする（コンテナは起動しない） |
| `docker compose up` | 既存のイメージを使ってコンテナを起動 |
| `docker compose up --build` | ビルド + 起動をまとめて実行 |

### 🛠 どんなときに使う？

| ケース | 使うコマンド |
|-----------------------------|-----------------------------|
| **初回の起動** | `docker compose up --build` |
| **コードを変更せずに再起動** | `docker compose up` |
| **Dockerfileを変更したとき** | `docker compose up --build` |
| **イメージだけをビルド** | `docker compose build` |

---

## 📚 Learn More

To learn more about Next.js, take a look at the following resources:

- 📖 [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- 🎓 [Learn Next.js](https://nextjs.org/learn-pages-router) - An interactive Next.js tutorial.

You can check out the [Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

---

## ☁️ Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
```
