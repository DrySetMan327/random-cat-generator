// app/layout.tsx
// アプリケーション内の全てのページで共有されるルートレイアウト
import { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";

import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";

// フォントの設定
const interFont = Inter({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-inter",
});
const robotoFont = Roboto({
    weight: ["100", "300", "700"],
    subsets: ["latin"],
    variable: "--font-roboto",
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ja" className={`${interFont.variable} ${robotoFont.variable}`}>
            <head>
                {/* ファビコンの設定予定箇所 */}
                {/* <link rel="icon" href="/favicon.svg" type="image/svg+xml" /> */}
            </head>
            <body>
                <Header />
                {/* ページコンテンツ */}
                {children}
                <Footer />
            </body>
        </html>
    );
}

// HTMLメタデータの設定
export const metadata: Metadata = {
    title: "テストアプリ",
    description: "アプリの説明です",
    // 検索エンジンのクローラーに対する設定
    robots: {
        index: false,      // インデックスしない
        follow: false,     // リンクをたどらない
        nocache: true,     // キャッシュを作成しない
        googleBot: {
            index: false,
            follow: false,
            noimageindex: true,    // 画像のインデックスも作成しない
            'max-video-preview': -1,
            'max-image-preview': 'none',
            'max-snippet': -1,
        },
    },
};