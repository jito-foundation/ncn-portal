"use client";

import { useContext } from "react";
import { Badge, DropdownMenu, Flex, Heading } from "@radix-ui/themes";
import cs from "classnames";
import NextLink from "next/link";
import { ChainContext } from "../context/ChainContext";
import { ConnectWalletMenu } from "../ConnectWalletMenu";

export const Header = () => {
  const {
    displayName: currentChainName,
    chain,
    setChain,
  } = useContext(ChainContext);
  const currentChainBadge = (
    <Badge color="gray" style={{ verticalAlign: "middle" }}>
      {currentChainName}
    </Badge>
  );

  return (
    <header
      className={cs(
        "block shadow-sm sticky top-0 dark:shadow-gray-500 py-3 px-4 z-20",
      )}
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <Flex align="center" gap="3">
        <NextLink href="/">
          <Heading as="h2" size="4" style={{ maxWidth: 200 }}>
            NCN Portal
          </Heading>
        </NextLink>
        {setChain ? (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>{currentChainBadge}</DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.RadioGroup
                onValueChange={(value) => {
                  setChain(value as "solana:${string}");
                }}
                value={chain}
              >
                <DropdownMenu.RadioItem value="solana:devnet">
                  Devnet
                </DropdownMenu.RadioItem>
              </DropdownMenu.RadioGroup>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        ) : (
          currentChainBadge
        )}
        <Flex align="center" gap="3" className="ml-auto">
          <ConnectWalletMenu>Connect Wallet</ConnectWalletMenu>
        </Flex>
      </Flex>
    </header>
  );
};
