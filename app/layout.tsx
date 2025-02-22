import ChatbotModal from "@/components/ChatbotModal";
import { AuthProvider } from "@/components/context/AuthContext";
import { ChainContextProvider } from "@/components/context/ChainContextProvider";
import { RpcContextProvider } from "@/components/context/RpcContextProvider";
import { SelectedWalletAccountContextProvider } from "@/components/context/SelectedWalletAccountContextProvider";
import ThemesProvider from "@/providers/ThemesProvider";
import { Analytics } from "@vercel/analytics/react";
import { Footer, Layout, Navbar } from "nextra-theme-docs";
import "nextra-theme-docs/style.css";
import { Banner, Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import { Toaster } from "react-hot-toast";

import "./globals.scss";
import "./theme-config.css";

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

const banner = (
  <Banner storageKey="some-key">Jito Restaking is released 🎉</Banner>
);
const navbar = (
  <Navbar
    logo={<b>NCN Portal</b>}
    projectLink="https://github.com/jito-foundation/restaking"
  />
);
const footer = <Footer>MIT {new Date().getFullYear()} © Jito.</Footer>;

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
                  <Head></Head>
                  <Layout
                    banner={banner}
                    navbar={navbar}
                    pageMap={await getPageMap()}
                    docsRepositoryBase="https://github.com/shuding/nextra/tree/main/docs"
                    footer={footer}
                  >
                    {children}
                  </Layout>
                  <ChatbotModal />
                  <Toaster />
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
