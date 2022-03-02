import React from "react";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { GoVerified } from "react-icons/go";
import { useHistory } from "react-router-dom";
import { uploadIPFS } from "../../../context/ipfs/upload";
import { useState } from "react";
import { useNotifyContext } from "../../../context/notifyContext";

import ERC721MockArtifacts from "../../../Contracts/ERC721Mock.json";
import NftFractionRepository from "../../../Contracts/NftFractionsRepository.json";
import { ethers } from "ethers";
import {
  erc721mockaddress,
  nftfractionRepositoryaddress,
} from "../../../config";
import Web3Modal from "web3modal";

const AddItem = ({
  handleAddItem,
  handleItemsInp,
  handleWatchImg,
  handlePdfSelect,
  inputValues,
  imgUrl,
  pdfUrl,
  local,
  loading,
  handleEmptyImg,
  handleEmptyPdf,
  cross,
  backTable,
  // form,
  backLink,
  editForm,
}) => {
  const history = useHistory();
  const { set_notify, set_loader } = useNotifyContext();
  // loading
  let [status, setStatus] = useState(false);
  let [CID, setCID] = useState("");
  let [processing, setProcessing] = useState(false);

  const handleUpload = async () => {
    setProcessing(true);
    set_loader(true);
    if (local !== null && inputValues !== {}) {
      const ipfsHash = await uploadIPFS(local, inputValues);
      console.log(ipfsHash);
      setStatus(true);
      setCID(ipfsHash);
      set_notify({
        open: true,
        msg: "Watch Data uploaded Successfully!",
        type: "success",
      });
    }
    setProcessing(false);
    set_loader(false);
  };

  const handleMint = async (event) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provier = new ethers.providers.Web3Provider(connection);
    const signer = provier.getSigner();

    setProcessing(true);
    set_loader(true);

    let tokenId;

    // create nft item
    try {
      const nftContract = new ethers.Contract(
        erc721mockaddress,
        ERC721MockArtifacts.abi,
        signer
      );
      let transaction = await nftContract.mintNFT(CID);
      let tx = await transaction.wait();

      tokenId = await nftContract.totalSupply();
      console.log("Token Id: ", tokenId.toNumber());
    } catch (e) {
      console.error(e);
      setProcessing(false);
      set_loader(false);

      set_notify({
        open: true,
        msg: "Something wrong!",
        type: "error",
      });

      return;
    }

    // Deposit
    try {
      const nftfractionrepository_contract = new ethers.Contract(
        nftfractionRepositoryaddress,
        NftFractionRepository.abi,
        signer
      );
      const depositTransaction =
        await nftfractionrepository_contract.depositNft(
          erc721mockaddress,
          tokenId,
          inputValues.price
        );
      let depositTx = await depositTransaction.wait();
      console.log("DEPOSIT function: ", depositTx);
    } catch (e) {
      console.error(e);
      setProcessing(false);
      set_loader(false);

      set_notify({
        open: true,
        msg: "Something wrong!",
        type: "error",
      });

      return;
    }

    // Update DB
    handleAddItem(event, tokenId.toNumber());

    set_notify({
      open: true,
      msg: "Watch Minted Successfully!",
      type: "success",
    });

    history.push("/dashboard");

    setProcessing(false);
    set_loader(false);
  };

  return (
    <div className="create_goals_box">
      <div className="create_goals_inp">
        {backLink ? (
          <Link to="/dashboard" className="icBtn">
            <IoMdArrowRoundBack />
          </Link>
        ) : (
          <button className="icBtn" onClick={backTable}>
            <IoMdArrowRoundBack />
          </button>
        )}
        <form onSubmit={handleAddItem}>
          <div className="half_gaols_md">
            <div className="half_inp_goals">
              <div className="goals_inp">
                <p
                  style={{
                    marginBottom: "10px",
                    marginTop: "20px",
                    fontWeight: "bold",
                  }}
                >
                  Seller Info:
                </p>

                <label htmlFor="eventname">
                  <p> First Name:</p>
                  <input
                    type="text"
                    required
                    onChange={handleItemsInp}
                    name="firstName"
                    id="firstName"
                    value={inputValues.firstName}
                  />
                </label>
              </div>
              <div className="goals_inp ">
                <label htmlFor="dificulty">
                  <p>Last Name</p>
                  <input
                    type="text"
                    required
                    onChange={handleItemsInp}
                    name="lastName"
                    id="lastName"
                    value={inputValues.lastName}
                  />
                </label>
              </div>
              <div className="goals_inp">
                <label htmlFor="">
                  <p> Email:</p>
                  <input
                    type="email"
                    name="email"
                    required
                    onChange={handleItemsInp}
                    value={inputValues.email}
                  />
                </label>
              </div>
              <div className="goals_inp">
                <label htmlFor="">
                  <p>Phone Number: </p>
                  <input
                    type="text"
                    name="number"
                    required
                    onChange={handleItemsInp}
                    value={inputValues.number}
                  />
                </label>
              </div>
              <div className="goals_inp">
                <p
                  style={{
                    marginBottom: "10px",
                    marginTop: "20px",
                    fontWeight: "bold",
                  }}
                >
                  Watch Info:
                </p>
                <label htmlFor="">
                  <p> Brand</p>
                  <input
                    type="text"
                    name="brand"
                    required
                    onChange={handleItemsInp}
                    value={inputValues.brand}
                  />
                </label>
              </div>
              <div className="goals_inp">
                <label htmlFor="">
                  <p> Model</p>
                  <input
                    type="text"
                    name="model"
                    required
                    onChange={handleItemsInp}
                    value={inputValues.model}
                  />
                </label>
              </div>
              <div className="goals_inp">
                <label htmlFor="">
                  <p> Price</p>
                  <input
                    type="number"
                    name="price"
                    required
                    onChange={handleItemsInp}
                    value={inputValues.price}
                  />
                </label>
              </div>
              <div className="goals_inp">
                <label className="" htmlFor="">
                  <p> Reference</p>
                  <input
                    type="text"
                    name="reference"
                    required
                    onChange={handleItemsInp}
                    value={inputValues.reference}
                  />
                </label>
              </div>
            </div>
            <div className="right_hald_inp">
              <div className="goals_pic_upload">
                <p>Upload Photo:</p>
                {imgUrl ? (
                  <div className="crossImg">
                    {cross ? (
                      <button className="crosImg_btn" onClick={handleEmptyImg}>
                        x
                      </button>
                    ) : null}
                    <img className="uploaded_goal_img" src={imgUrl} alt="..." />
                  </div>
                ) : (
                  // <p className="empty"></p>
                  // null
                  <label className="cus_btnUpload" htmlFor="goalImg">
                    <input
                      type="file"
                      accept="image/*"
                      name="goalImg"
                      onChange={handleWatchImg}
                      style={{ display: "none" }}
                      id="goalImg"
                    />
                    <p> Upload image</p>
                    <MdOutlineAddAPhoto className="iconss" />
                  </label>
                )}

                {pdfUrl ? (
                  <div className="crossImg">
                    <button className="crosImg_btn" onClick={handleEmptyPdf}>
                      x
                    </button>
                    <iframe src={pdfUrl} frameborder="0"></iframe>
                  </div>
                ) : (
                  <label className="cus_btnUpload" htmlFor="certImg">
                    <input
                      type="file"
                      accept=".pdf"
                      // name="goalImg"
                      onChange={handlePdfSelect}
                      style={{ display: "none" }}
                      id="certImg"
                    />
                    <p> Upload Auth Cert</p>
                    <GoVerified className="iconss" />
                  </label>
                )}
                <p>Note: only select pdf file for Auth Certificate</p>
              </div>
            </div>
          </div>
          <div className="addGoals_btn">
            {/* {!editForm && <>
            </>} */}
            <button className="btn btn-success mx-1" type="submit">
              Save
            </button>
            <button
              className="btn btn-primary mx-1"
              type="button"
              onClick={handleUpload}
              disabled={status}
            >
              Upload
            </button>
            <button
              className="btn btn-primary mx-1"
              type="button"
              onClick={handleMint}
              disabled={!status}
            >
              Mint
            </button>
          </div>
        </form>
      </div>
      {loading ? (
        <div className="addGoals_loading">
          <div className="addGoals_loading_md">
            {/* <CircularProgress /> */}
            <p>Loading...</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AddItem;
