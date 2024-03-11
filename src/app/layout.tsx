import Providers from "@/context/Providers";
import "@/styles/globals.css";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Binpar - PokeAPI",
  description: "Pokeapi generated for Binpar, by Borja Muñoz",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + ' bg-[#FFCC00]'}>
        <div className="dots" >
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
