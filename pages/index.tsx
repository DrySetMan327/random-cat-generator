import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import styles from "../styles/index.module.css";

// データフェッチAPIのgetServerSidePropsから渡されるpropsの型を定義
type Props = {
    initialImageUrl: string;
};

// ランダムな猫の画像をページ上に表示するためのページコンポーネント
const IndexPage: NextPage<Props> = ({ initialImageUrl }) => {

    // useStateとuseEffectを使用して画像読み込みの状態と更新操作を定義
    const [imageUrl, setImageUrl] = useState(initialImageUrl);
    const [isLoading, setIsLoading] = useState(false);

    // ページ初期表示時の画像取得はサーバーサイド処理で実装したため不要
    // useEffect(() => {
    //     fetchImage().then((newImage) => {
    //         // 画像URLとローディング状態を更新
    //         setImageUrl(newImage.url);
    //         setIsLoading(false);
    //     });
    // }, []);

    // ボタンをクリックしたときに新しい猫の画像を読み込む関数
    const handleClick = async () => {
        // ローディング状態を読み込み中のフラグに更新
        setIsLoading(true);
        const newImage = await fetchImage();
        // 画像URLの状態を更新
        setImageUrl(newImage.url);
        // ローディング状態を読み込み中のフラグに更新
        setIsLoading(false);
    };

    // ローディング中であれば"Now Loading..."のテキスト、ローディング中でなければ取得した画像を表示
    return (
        <div className={styles.page}>
            <button onClick={handleClick} className={styles.button}>
                他のにゃんこも見る!!
            </button>
            <div className={styles.frame}>
                {isLoading ? 
                    <span className={styles.loadingMessage}>にゃんこ読み込み中...</span>
                    : <img src={imageUrl} className={styles.img}/>
                } 
            </div>
        </div>
    );
};
export default IndexPage;

// ページ初期表示時の画を取得するサーバーサイドの処理
export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const image = await fetchImage();
    return {
        props: {
            initialImageUrl: image.url,
        },
    };
};

// The Cat APIのレスポンスに含まれる画像情報の型を定義
type Image = {
    url: string;
};

// The Cat APIを使用して猫の画像を取得する関数
const fetchImage = async (): Promise<Image> => {
    const res: Response = await fetch("https://api.thecatapi.com/v1/images/search");
    // The Cat APIのレスポンス（json）のサンプル
    // [
    //     {
    //       "id": "co9",
    //       "url": "https://cdn2.thecatapi.com/images/co9.jpg",
    //       "width": 900,
    //       "height": 600
    //     }
    // ]

    const images: unknown = await res.json();
    // APIのレスポンスが配列で表現されているかどうかチェック
    if (!Array.isArray(images)) {
        throw new Error("通信エラーだニャー（猫画像取得APIの実行に失敗しました）");
    }
    console.log(images);
    const image: unknown = images[0];
    // ユーザー定義型Imageの構造として適切かどうかチェック
    if (!isImage(image)) {
        throw new Error("通信エラーだニャー（猫画像取得APIの実行に失敗しました）");
    }
    return image;
};

// ユーザー定義型Imageとして適切かどうか判定する型ガード関数
const isImage = (value: unknown): value is Image => {
    // 関数に与えられた引数valueがオブジェクト型（nullを除く）であるかどうか判定
    if (!value || typeof value !== "object") {
        return false;
    }
    // 低数valueにurlプロパティが存在し、かつ、それが文字列型であるかどうか判定
    return "url" in value && typeof value.url === "string";
};