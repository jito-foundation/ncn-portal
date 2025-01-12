"use client";

import { devnet, mainnet, testnet } from "@solana/web3.js";
import { useMemo, useState } from "react";

import { ChainContext, DEFAULT_CHAIN_CONFIG } from "./ChainContext";

const STORAGE_KEY = "solana-example-react-app:selected-chain";

export function ChainContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  let storageKey: string | null =
    process.env.NEXT_PUBLIC_SOLANA_CHAIN || "solana:devnet";

  if (typeof window !== "undefined") {
    storageKey = localStorage.getItem(STORAGE_KEY) || storageKey;
  }
  const [chain, setChain] = useState(storageKey);

  const contextValue = useMemo<ChainContext>(() => {
    switch (chain) {
      case "solana:mainnet":
        if (process.env.REACT_EXAMPLE_APP_ENABLE_MAINNET === "true") {
          return {
            chain: "solana:mainnet",
            displayName: "Mainnet Beta",
            solanaExplorerClusterName: "mainnet-beta",
            solanaRpcSubscriptionsUrl: mainnet(
              "wss://api.mainnet-beta.solana.com",
            ),
            solanaRpcUrl: mainnet("https://api.mainnet-beta.solana.com"),
          };
        }
      // falls through
      case "solana:testnet":
        return {
          chain: "solana:testnet",
          displayName: "Testnet",
          solanaExplorerClusterName: "testnet",
          solanaRpcSubscriptionsUrl: testnet("wss://api.testnet.solana.com"),
          solanaRpcUrl: testnet("https://api.testnet.solana.com"),
        };
      case "solana:devnet":
        return {
          chain: "solana:devnet",
          displayName: "Devnet",
          solanaExplorerClusterName: "devnet",
          solanaRpcSubscriptionsUrl: devnet("wss://api.devnet.solana.com"),
          solanaRpcUrl: devnet("https://api.devnet.solana.com"),
        };
      case "solana:localhost":
        return {
          chain: "solana:localhost",
          displayName: "Localhost",
          solanaExplorerClusterName: "localhost",
          solanaRpcSubscriptionsUrl: devnet("ws://localhost:8900/"),
          solanaRpcUrl: devnet("http://localhost:8899"),
        };
      default:
        if (chain !== "solana:devnet") {
          if (typeof window !== "undefined") {
            localStorage.removeItem(STORAGE_KEY);
          }
          console.error(`Unrecognized chain \`${chain}\``);
        }
        return DEFAULT_CHAIN_CONFIG;
    }
  }, [chain]);
  return (
    <ChainContext.Provider
      value={useMemo(
        () => ({
          ...contextValue,
          setChain(chain) {
            if (typeof window !== "undefined") {
              localStorage.setItem(STORAGE_KEY, chain);
            }
            setChain(chain);
          },
        }),
        [contextValue],
      )}
    >
      {children}
    </ChainContext.Provider>
  );
}
