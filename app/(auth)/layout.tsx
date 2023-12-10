import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

import "../globals.css";
const inter = Inter({ subsets: ["latin"] });


export const metadata = {
    title: "CircleSphere",
    description: "A Modern Scoial Media Platform",
  };


  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <ClerkProvider
      >
        <html lang='en'>
          
          <body className={`${inter.className} bg-dark-1`}>
          <header className="bg-primary-500 text-white p-4 text-center">
              <h1 className="text-4xl font-bold">CircleSphere</h1>
            </header>
            <div className="w-full flex justify-center items-center min-h-screen">
            {children}
            </div>
            </body>
        </html>
      </ClerkProvider>
    );
  }
