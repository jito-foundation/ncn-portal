import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";
import { Header } from "@/components/Header";
import ThemesProvider from "@/providers/ThemesProvider";
import { ChainContextProvider } from "@/components/context/ChainContextProvider";
import { SelectedWalletAccountContextProvider } from "@/components/context/SelectedWalletAccountContextProvider";
import { RpcContextProvider } from "@/components/context/RpcContextProvider";
import { AuthProvider } from "@/components/context/AuthContext";

import "./globals.scss";
import "./theme-config.css";

// import AppWalletProvider from "@/components/AppWalletProvider";
// import { useMemo } from "react";
// import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
// import { clusterApiUrl } from "@solana/web3.js";
// import { ConnectionProvider } from "@solana/wallet-adapter-react";

export const metadata = {
  title: {
    default: "NCN Portal",
    template: `%s - Claude Lite`,
  },
  description: "AI assistant powered by Claude",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* <AppWalletProvider> */}
        <ThemesProvider>
          <ChainContextProvider>
            <SelectedWalletAccountContextProvider>
              <RpcContextProvider>
                <AuthProvider>
                  <Header />
                  {children}
                  <Toaster />
                </AuthProvider>
              </RpcContextProvider>
            </SelectedWalletAccountContextProvider>
          </ChainContextProvider>
        </ThemesProvider>
        {/* </AppWalletProvider> */}
        <Analytics />
      </body>
    </html>
  );
}
