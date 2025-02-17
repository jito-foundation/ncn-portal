"use client";

import { Suspense, useContext } from "react";
import { SelectedWalletAccountContext } from "@/components/context/SelectedWalletAccountContext";
import { WhitelistFeaturePanel } from "@/components/WhitelistPanel";
import Image from "next/image";
import { Header } from "@/components/Header";

import jitoRestakingV1 from "../../public/jitoRestakingV1_crop.webp";

const HomePage = () => {
  const [selectedWalletAccount] = useContext(SelectedWalletAccountContext);

  const cards = [
    {
      text: "What are VRTs?",
      icon: "🪙",
    },
    {
      text: "What are Node Consensus Networks (NCNs), and how do they utilize staked assets in Jito (Re)staking?",
      icon: "🔗",
    },
    {
      text: "Who are Node Operators in the Jito (Re)staking ecosystem, and what roles do they play?",
      icon: "🛠️",
    },
    {
      text: "What is example of NCN?",
      icon: "💻",
    },
  ];

  return (
    <Suspense>
      <Header />
      {selectedWalletAccount ? (
        <div className="w-screen flex justify-center h-screen">
          <div className="w-8/12 flex justify-center items-center">
            <div className="">
              <h1 className="text-5xl my-5">Welcome!</h1>
              <h2 className="text-4xl my-5">What do you need help with?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                {cards.map((card, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="h-20">
                      <p className="text-sm text-gray-300">{card.text}</p>
                    </div>
                    <div className="mt-4 text-3xl text-purple-500">
                      {card.icon}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center m-8">
                <WhitelistFeaturePanel account={selectedWalletAccount} />
              </div>
            </div>
          </div>
        </div>
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
