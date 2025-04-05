export default function Mypage() {
    return (
        <div className="h-screen flex items-center justify-center bg-white">
            <div className="flex-1 flex-col flex items-center justify-center gap-4  h-screen">
                <h1 className="text-4xl font-bold" style={{ color: 'rgb(30, 100, 175)' }}>Tone Assist</h1>
                <h2 className="text-xl" style={{ color: 'rgb(30, 100, 175)' }}>色覚バリアフリー チェッカー</h2>
            </div>
            <div className="flex-1 flex-col flex items-center justify-center bg-yellow-100 h-screen">
                <div className="text-5xl text-black p-10">マイページ</div>
            </div>
        </div>
    );
}