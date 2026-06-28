import { Metadata } from "next";
import FunnelPage from "./FunnelPage";

export const metadata: Metadata = {
  title: "Demini - 코딩 몰라도 나만의 AI 앱 만들기",
  description: "코딩 없이 Gemini AI한테 시켜서 나만의 앱을 만드세요. 무료, 3분 설치, 터미널 불필요.",
};

export default function Home() {
  return <FunnelPage />;
}
