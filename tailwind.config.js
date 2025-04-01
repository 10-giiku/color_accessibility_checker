module.exports = {
    theme: {
      extend: {
        colors: {
          customBlue: 'rgb(30, 100, 175)', // カスタムカラーを定義
        },
      },
    },
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    plugins: [],
  };