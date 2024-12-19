"use client";
import { Suspense, useContext } from "react";
import { ConnectWalletMenu } from "@/components/ConnectWalletMenu";
import { SelectedWalletAccountContext } from "@/components/context/SelectedWalletAccountContext";
import { ChainContext } from "@/components/context/ChainContext";
import { WhitelistFeaturePanel } from "@/components/WhitelistPanel";
import { useAuth } from "@/components/context/AuthContext";
import { useRouter } from "next/router";

const HomePage = () => {
  const { chain } = useContext(ChainContext);
  const [selectedWalletAccount] = useContext(SelectedWalletAccountContext);
  // const { connection } = useConnection();
  // const { publicKey } = useWallet();

  // async function getProvider() {
  //   /* create the provider and return it to the caller */
  //   /* network set to local network for now */
  //   const programId = new PublicKey("DwyMNTQ5aSduQhx3Pjra9kXeySxjD5YUkC1bDXmvEPFZ");
  //   const network = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "";
  //   const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  //   const provider = new Provider(
  //     connection, wallet, opts.preflightCommitment,
  //   );
  //   return provider;
  // }

  return (
    <Suspense>
      {selectedWalletAccount ? (
        // <ChatProvider />
        // <SolanaSignAndSendTransactionFeaturePanel account={selectedWalletAccount} />
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
