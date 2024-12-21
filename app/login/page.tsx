"use client";

import { Suspense, useContext } from "react";
import { SelectedWalletAccountContext } from "@/components/context/SelectedWalletAccountContext";
import { WhitelistFeaturePanel } from "@/components/WhitelistPanel";
import Image from "next/image";
import jitoRestakingV1 from "../../public/jitoRestakingV1_crop.webp";

const HomePage = () => {
  const [selectedWalletAccount] = useContext(SelectedWalletAccountContext);

  return (
    <Suspense>
      {selectedWalletAccount ? (
        <WhitelistFeaturePanel account={selectedWalletAccount} />
      ) : (
        <div className="w-screen flex justify-center h-screen">
          <div className="w-6/12 flex justify-center items-center">
            <div>
              <h1 className="text-5xl my-5">NCN Portal</h1>
              <p className="text-xl">
                The NCN Portal is a developer resource that provides the
                essential concepts and references for building NCN on Jito
                Restaking.
              </p>
            </div>
            <Image
              src={jitoRestakingV1}
              alt="Jito Restaking"
              width={400}
              height={400}
            />
          </div>
        </div>
      )}
    </Suspense>
  );
};

export default HomePage;
