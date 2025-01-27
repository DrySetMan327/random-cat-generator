"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";

export default function App() {
    
    // 動的処理を伴う画面遷移に使用するためのルートハンドラー
    // const router = useRouter();
    //     const toRoute1 = () => {
    //     router.push('/route1');
    // }

    return (
        <>
            <div className="flex justify-center items-center my-4">
                猫ジェネレーターは
                <Link href="/home" className="transition hover:opacity-40">こちら</Link>
            </div>
            <div className="flex justify-center items-center my-4">
                <button className="inline-flex h-12 items-center justify-center relative overflow-hidden
                rounded-md bg-neutral-950 px-6 font-medium text-neutral-50 shadow-lg shadow-neutral-500/20
                transition-all duration-300 hover:bg-neutral-800 hover:ring-2 active:scale-95
                hover:ring-neutral-800 hover:ring-offset-2">
                    <span className="relative">Click me</span>
                </button>
            </div>
        </>
    );
};