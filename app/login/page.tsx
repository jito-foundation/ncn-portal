"use client";

import { Suspense, useContext } from "react";
import { ConnectWalletMenu } from "@/components/ConnectWalletMenu";
import { SelectedWalletAccountContext } from "@/components/context/SelectedWalletAccountContext";
import { WhitelistFeaturePanel } from "@/components/WhitelistPanel";

const HomePage = () => {
  const [selectedWalletAccount] = useContext(SelectedWalletAccountContext);

  return (
    <Suspense>
      {selectedWalletAccount ? (
        <WhitelistFeaturePanel account={selectedWalletAccount} />
      ) : (
        <main className="flex items-center justify-center min-h-screen">
          <div className="border hover:border-slate-900 rounded">
            <ConnectWalletMenu>Connect Wallet</ConnectWalletMenu>
          </div>
        </main>
      )}
    </Suspense>
  );
};

export default HomePage;
