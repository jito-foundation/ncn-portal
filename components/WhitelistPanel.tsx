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
} from "@solana/web3.js";
import { type UiWalletAccount } from "@wallet-standard/react";
import { useContext, useEffect, useRef, useState } from "react";
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
import toast from "react-hot-toast";

type Props = Readonly<{
  account: UiWalletAccount;
}>;

export function WhitelistFeaturePanel({ account }: Props) {
  const { mutate } = useSWRConfig();
  const { current: NO_ERROR } = useRef(Symbol());
  const { rpc } = useContext(RpcContext);
  const [isSendingTransaction, setIsSendingTransaction] = useState(false);

  const [accessStatus, setAccessStatus] = useState<number | null>(null);
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [error, setError] = useState<symbol | any>(NO_ERROR);
  const [lastSignature, setLastSignature] = useState<Uint8Array | undefined>();
  const { chain: currentChain } = useContext(ChainContext);
  const transactionSendingSigner = useWalletAccountTransactionSendingSigner(
    account,
    currentChain,
  );
  const { login } = useAuth();
  const router = useRouter();

  const request = async (requestType: string) => {
    const url = "/api/login";

    const data = {
      requestType,
      address: account.address,
    };

    return await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  useEffect(() => {
    const fetchWhitelist = async () => {
      try {
        const res = await request("getWhitelist");
        const json = await res.json();

        setAccessStatus(json.data);
      } catch (e) {
        setLastSignature(undefined);
        setError({ message: "You are not whitelisted" });
      } finally {
        setIsSendingTransaction(false);
      }
    };

    fetchWhitelist();
  }, []);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError(NO_ERROR);
    setIsSendingTransaction(true);
    try {
      const res = await request("login");
      const json = await res.json();

      const { value: latestBlockhash } = await rpc
        .getLatestBlockhash({ commitment: "confirmed" })
        .send();
      const [whitelistAddress] = await getProgramDerivedAddress({
        programAddress: address(NCN_PORTAL_PROGRAM_ADDRESS),
        seeds: [Buffer.from("whitelist")],
      });
      const message = pipe(
        createTransactionMessage({ version: 0 }),
        (m) => setTransactionMessageFeePayerSigner(transactionSendingSigner, m),
        (m) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, m),
        (m) =>
          appendTransactionMessageInstruction(
            getCheckWhitelistedInstruction({
              whitelist: whitelistAddress,
              whitelisted: transactionSendingSigner,
              proof: json.data,
            }),
            m,
          ),
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
      setError({ message: "You are not whitelisted" });
    } finally {
      setIsSendingTransaction(false);
    }
  };

  const handleUnlockChatbot = async (e: any) => {
    e.preventDefault();
    setError(NO_ERROR);

    try {
      const res = await request("unlockChatbot");
      const json = await res.json();

      if (json.status) {
        toast.success("Your request has been sent! Please wait for approval.");
        setAccessStatus(1);
      } else {
        toast.error("Failed to send request. Please try again later.");
      }
    } catch (e) {
      toast.error("Failed to send request. Please try again later.");
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
      <div>
        {(() => {
          switch (accessStatus) {
            case 0:
              return <h1>Not Whitelisted</h1>;
            case 1:
              return <h1>Pending</h1>;
            case 2:
              return (
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
                      type="button"
                      className="cursor-pointer"
                      onClick={handleLogin}
                    >
                      Ask the Chatbot Now
                    </Button>
                  </Dialog.Trigger>
                </Dialog.Root>
              );
            case 3:
              return <h1>Banned</h1>;
            default:
              return (
                <Button
                  color={error ? undefined : "red"}
                  type="button"
                  className="cursor-pointer"
                  onClick={handleUnlockChatbot}
                >
                  Unlock Chatbot
                </Button>
              );
          }
        })()}

        {error !== NO_ERROR ? (
          <ErrorDialog
            error={error}
            onClose={() => setError(NO_ERROR)}
            title="SignIn failed"
          />
        ) : null}
      </div>
    </Flex>
  );
}
