import { NFTStorage, File } from "nft.storage";


const NFT_STORAGE_TOKEN = process.env.REACT_APP_NFT_STORAGE_TOKEN || "";

// The function to upload to IPFS
export const uploadIPFS = async (photoFile, jsonData) => {
  console.log("token", NFT_STORAGE_TOKEN);
  const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

  const metadata = await client.store({
    name: "test",
    description: "test",
    image: new File([photoFile], "image", { type: "image/png" }),
    attributes: jsonData,
  });

  const ipfsHash = await metadata.url;

  return ipfsHash.replace("ipfs://", "https://dweb.link/ipfs/");
};
