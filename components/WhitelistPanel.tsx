import { Button, Dialog, Flex } from "@radix-ui/themes";
import { useWalletAccountTransactionSendingSigner } from "@solana/react";
import {
  address,
  appendTransactionMessageInstruction,
  assertIsTransactionMessageWithSingleSendingSigner,
  createTransactionMessage,
  pipe,
  setTransactionMessageFeePayerSigner,
  setTransactionMessageLifetimeUsingBlockhash,
  signAndSendTransactionMessageWithSigners,
  getProgramDerivedAddress,
  getAddressEncoder,
  Address,
} from "@solana/web3.js";
import { type UiWalletAccount } from "@wallet-standard/react";
import { useContext, useRef, useState } from "react";
import { useSWRConfig } from "swr";

import { ChainContext } from "./context/ChainContext";
import { RpcContext } from "./context/RpcContext";
import { ErrorDialog } from "./ErrorDialog";
import {
  getCheckWhitelistedInstruction,
  NCN_PORTAL_PROGRAM_ADDRESS,
} from "@/idl";
import { useAuth } from "./context/AuthContext";
import { useRouter } from "next/navigation";

type Props = Readonly<{
  account: UiWalletAccount;
}>;

export function WhitelistFeaturePanel({ account }: Props) {
  const { mutate } = useSWRConfig();
  const { current: NO_ERROR } = useRef(Symbol());
  const { rpc } = useContext(RpcContext);
  const [isSendingTransaction, setIsSendingTransaction] = useState(false);

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [error, setError] = useState<symbol | any>(NO_ERROR);
  const [lastSignature, setLastSignature] = useState<Uint8Array | undefined>();
  const { chain: currentChain } = useContext(ChainContext);
  const transactionSendingSigner = useWalletAccountTransactionSendingSigner(
    account,
    currentChain
  );
  const { login } = useAuth();
  const router = useRouter();

  const getProof = async () => {
    const url = "/api/login";

    const data = {
      address: account.address,
    };

    return await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError(NO_ERROR);
    setIsSendingTransaction(true);
    try {
      const res = await getProof();
      const json = await res.json();

      const addressEncoder = getAddressEncoder();
      const { value: latestBlockhash } = await rpc
        .getLatestBlockhash({ commitment: "confirmed" })
        .send();
      const [whitelistAddress] = await getProgramDerivedAddress({
        programAddress: address(NCN_PORTAL_PROGRAM_ADDRESS),
        seeds: [Buffer.from("whitelist")],
      });
      const [whitelistEntryAddress, whitelistEntryBump] =
        await getProgramDerivedAddress({
          programAddress: address(NCN_PORTAL_PROGRAM_ADDRESS),
          seeds: [
            Buffer.from("whitelist_entry"),
            addressEncoder.encode(whitelistAddress as Address),
            addressEncoder.encode(transactionSendingSigner.address as Address),
          ],
        });
      const message = pipe(
        createTransactionMessage({ version: 0 }),
        (m) => setTransactionMessageFeePayerSigner(transactionSendingSigner, m),
        (m) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, m),
        (m) =>
          appendTransactionMessageInstruction(
            // getCheckWhitelistedInstruction({
            //   whitelist: whitelistAddress,
            //   whitelistEntry: whitelistEntryAddress,
            //   whitelisted: transactionSendingSigner,
            // }),
            getCheckWhitelistedInstruction({
              whitelist: whitelistAddress,
              whitelisted: transactionSendingSigner,
              whitelistEntry: whitelistEntryAddress,
              proof: json.data,
            }),
            m
          )
      );
      assertIsTransactionMessageWithSingleSendingSigner(message);
      const signature = await signAndSendTransactionMessageWithSigners(message);
      void mutate({
        address: transactionSendingSigner.address,
        chain: currentChain,
      });
      login!();
      router.push("/chat");
      setLastSignature(signature);
    } catch (e) {
      setLastSignature(undefined);
      setError(e);
    } finally {
      setIsSendingTransaction(false);
    }
  };

  return (
    <Flex
      asChild
      gap="2"
      direction={{ initial: "column", sm: "row" }}
      className=""
    >
      <form onSubmit={handleLogin}>
        <Dialog.Root
          open={!!lastSignature}
          onOpenChange={(open) => {
            if (!open) {
              setLastSignature(undefined);
            }
          }}
        >
          <Dialog.Trigger>
            <Button
              color={error ? undefined : "red"}
              loading={isSendingTransaction}
              type="submit"
              className="cursor-pointer"
            >
              Ask the Chatbot Now
            </Button>
          </Dialog.Trigger>
        </Dialog.Root>
        {error !== NO_ERROR ? (
          <ErrorDialog
            error={error}
            onClose={() => setError(NO_ERROR)}
            title="SignIn failed"
          />
        ) : null}
      </form>
    </Flex>
  );
}
