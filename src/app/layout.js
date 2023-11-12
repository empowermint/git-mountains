import "./globals.css";
import UserSelector from "@/components/user-selector";

import { Amatic_SC } from "next/font/google";
const font = Amatic_SC({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Git Mountains",
  description: "Visualise your GitHub commit history as a mountain range",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${font.className} h-screen`}>
        <header className="flex justify-between items-center p-4 tracking-wider place-self-start">
          <h1 className="text-3xl font-bold">Git Mountains</h1>
          <UserSelector user={""} />
        </header>
        <main className="h-full">{children}</main>
      </body>
    </html>
  );
}
