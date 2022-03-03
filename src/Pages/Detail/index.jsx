import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import "./detail.css";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { ethers } from "ethers";
import WatchDexBase from "../../Contracts/WatchDexBase.json";
import { watchdexBaseaddress } from "../../config";
import Web3Modal from "web3modal";
import { useNotifyContext } from "../../context/notifyContext";
import NftFractionRepository from "../../Contracts/NftFractionsRepository.json";

import { nftfractionRepositoryaddress } from "../../config";

const ProductDetail = () => {
  const { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(true);
  const itemSelector = useSelector((state) => {
    return state.watchReducer.items;
  });

  const { set_notify } = useNotifyContext();

  // get product details
  useEffect(() => {
    if (id && itemSelector?.length > 0) {
      setLoading(false);
      let getItemDetails = itemSelector.find((v) => v.key === id);
      setDetails(getItemDetails);
    }
  }, [id, itemSelector]);

  //   buy percentage
  let [percentInp, setPercent] = useState(false);
  const [percentage, setPercentage] = useState(0);

  const handleBuyByPercent = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provier = new ethers.providers.Web3Provider(connection);
    const signer = provier.getSigner();

    fetch(
      "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD"
    )
      .then((response) => response.json())
      .then(async (data) => {
        let ethRate = Number(data.ETH.USD).toFixed(1);
        console.log("EthRate: ", ethRate);
        let amount = ethers.BigNumber.from(
          parseFloat(
            Number(details.inputValues.price * (percentage / 100)).toFixed(0)
          )
        );
        let ethAmount = ethers.BigNumber.from(
          Math.round((amount / ethRate) * 1000000000000000000).toString()
        );

        console.log("Amount: ", amount);
        console.log("EthAmount: ", ethAmount);
        let contract = new ethers.Contract(
          watchdexBaseaddress,
          WatchDexBase.abi,
          signer
        );
        let buySide = 0;
        // let eth = ethers.BigNumber.from(Number(ethAmount).toFixed(2));
        // console.log(eth);
        console.log("Token Id: ", details.tokenId);
        const transaction = await contract.createMarketOrder(
          details.tokenId,
          amount,
          buySide,
          { value: ethAmount }
        );
        const tx = await transaction.wait();

        console.log("Transaction", tx);

        set_notify({
          open: true,
          msg: "Bought Successfully!",
          type: "success",
        });

        history.push("/");
      })
      .catch((e) => {
        console.error(e);
        set_notify({
          open: true,
          msg: "Something wrong",
          type: "error",
        });
      });
  };

  const handleBuyWhole = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provier = new ethers.providers.Web3Provider(connection);
    const signer = provier.getSigner();

    fetch(
      "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD"
    )
      .then((response) => response.json())
      .then(async (data) => {
        let ethRate = data.ETH.USD;
        // let amount = details.inputValues.price * (percentage / 100);
        let ethAmount = ethers.BigNumber.from(
          Math.round(
            (details.inputValues.price / ethRate) * 1000000000000000000
          ).toString()
        );

        console.log("EthAmount: ", ethAmount);
        // let contract = new ethers.Contract(
        //   watchdexBaseaddress,
        //   WatchDexBase.abi,
        //   signer
        // );
        const nftfractionrepository_contract = new ethers.Contract(
          nftfractionRepositoryaddress,
          NftFractionRepository.abi,
          signer
        );
        let buySide = 0;
        // let eth = ethers.BigNumber.from(Number(ethAmount).toFixed(2));
        // console.log(eth);
        console.log("Token Id: ", details.tokenId);
        const transaction = await nftfractionrepository_contract.withdrawNft(
          details.tokenId,
          { value: ethAmount }
        );
        const tx = await transaction.wait();

        console.log("Transaction", tx);

        set_notify({
          open: true,
          msg: "Bought Successfully!",
          type: "success",
        });
        history.push("/");
      })
      .catch((e) => {
        console.error(e);
        set_notify({
          open: true,
          msg: "Something wrong",
          type: "error",
        });
      });
  };

  return (
    <div className="container">
      <div className="row py-3 mb-4">
        {!loading ? (
          <div className="col-12 p-0">
            <div className="row m-0">
              <div className="col-12 mb-2">
                <IoArrowBackCircleSharp
                  onClick={() => history.goBack()}
                  className="cursor-pointer mb-2 goBackIcon"
                />
                <h3>
                  Brand:{" "}
                  <span className="text-secondary">
                    {details?.inputValues?.brand}
                  </span>
                </h3>
              </div>
              <div className="col-md-7 mb-3 col-12">
                <img
                  className="img-fluid detail_page_img"
                  src={details.url}
                  alt={details?.inputValues?.brand}
                />
              </div>
              <div className="col-md-5 col-12">
                <h3 className="px-md-2">Other details: </h3>
                <div className="d-flex justify-content-between align-items-center border rounded mx-md-2 px-3 py-2">
                  <p className="fw-bold m-0">Price: </p>
                  <p className="m-0 text-muted">
                    ${details?.inputValues?.price}
                  </p>
                </div>
                <div className="d-flex mt-2 justify-content-between align-items-center border rounded mx-md-2 px-3 py-2">
                  <p className="fw-bold m-0">Model: </p>
                  <p className="m-0 text-muted">
                    ${details?.inputValues?.model}
                  </p>
                </div>
                <div className="d-flex mt-2 justify-content-between align-items-center border rounded mx-md-2 px-3 py-2">
                  <p className="fw-bold m-0">Reference: </p>
                  <p className="m-0 text-muted">
                    {details?.inputValues?.reference}
                  </p>
                </div>
                <div className="btnsContents">
                  <Button
                    variant="dark"
                    onClick={() => setPercent(!percentInp)}
                  >
                    Buy %
                  </Button>
                  <Button
                    style={{ marginLeft: "10px" }}
                    variant="dark"
                    onClick={handleBuyWhole}
                  >
                    Buy whole watch{" "}
                  </Button>{" "}
                  <br />
                </div>
                {percentInp ? (
                  <InputGroup className="mb-3 mt-3">
                    <FormControl
                      placeholder="Enter value between 1% to 99%"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      type="number"
                      value={percentage}
                      onChange={(e) => setPercentage(e.target.value)}
                    />

                    <Button variant="dark" onClick={handleBuyByPercent}>
                      Enter
                    </Button>
                  </InputGroup>
                ) : null}
              </div>
            </div>
            <div className="w-100">
              <hr />
            </div>
          </div>
        ) : (
          <div className="col-12 py-4 my-4 text-center">
            <Spinner animation="border" variant="dark" />
            <br />
            <br />
            <h4>Loading...</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
