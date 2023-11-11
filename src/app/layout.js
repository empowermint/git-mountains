import { Amatic_SC } from "next/font/google";
import "./globals.css";

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
      <body className={font.className}>{children}</body>
    </html>
  );
}
