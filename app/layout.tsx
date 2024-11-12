import type { Metadata } from "next";
import "@/styles/globals.css";


export const metadata: Metadata = {
  title: "Shabble",
  description: "Shabble is a shape guessing game",
  icons: {
    icon: '/favicon.ico',    // This will look for the file in the public directory
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
