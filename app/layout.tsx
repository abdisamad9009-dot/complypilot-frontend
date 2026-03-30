import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={inter.className}
          style={{
            margin: 0,
            background: "#f3f4f6",
            minHeight: "100vh",
          }}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
