import 'nextra-theme-docs/style.css'
import "./globals.scss";

import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";
import { Header } from "@/components/Header";
import ThemesProvider from "@/providers/ThemesProvider";
import { ChainContextProvider } from "@/components/context/ChainContextProvider";
import { SelectedWalletAccountContextProvider } from "@/components/context/SelectedWalletAccountContextProvider";
import { RpcContextProvider } from "@/components/context/RpcContextProvider";
import { AuthProvider } from "@/components/context/AuthContext";
import { getPageMap } from 'nextra/page-map'

import "./theme-config.css";
import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { Banner } from "nextra/components";

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

const banner = <Banner storageKey="some-key">Nextra 4.0 is released 🎉</Banner>
const navbar = (
  <Navbar
    logo={<b>Nextra</b>}
  // ... Your additional navbar options
  />
)
const footer = <Footer>MIT {new Date().getFullYear()} © Nextra.</Footer>

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemesProvider>
          <ChainContextProvider>
            <SelectedWalletAccountContextProvider>
              <RpcContextProvider>
                <AuthProvider>
                  {/* <Header /> */}
                  <Layout
                    banner={banner}
                    navbar={navbar}
                    pageMap={await getPageMap()}
                    docsRepositoryBase="https://github.com/shuding/nextra/tree/main/docs"
                    footer={footer}
                  // ... Your additional layout options
                  >
                    {children}
                  </Layout>

                  {/* <Toaster /> */}
                </AuthProvider>
              </RpcContextProvider>
            </SelectedWalletAccountContextProvider>
          </ChainContextProvider>
        </ThemesProvider>
        <Analytics />
      </body>
    </html>
  );
}
