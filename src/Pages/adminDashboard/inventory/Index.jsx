import { useState, useEffect } from "react";
import AddItem from "./ItemForm";
import Inventorytable from "./Table";
import firebase from "../../../Config/FirebaseConfig";
import { useHistory } from "react-router-dom";
import "./inventory.css";
import { useNotifyContext } from "../../../context/notifyContext";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../../Components/Wallets/Connnectors";
import { useSelector } from "react-redux";

//  initialized form fields
const itemInput = {
  tokenId: "",
  firstName: "",
  lastName: "",
  email: "",
  number: "",
  brand: "",
  model: "",
  price: "",
  reference: "",
};

const Inventory = ({ id }) => {
  const { set_notify, set_loader } = useNotifyContext();
  const history = useHistory();
  // All Others form Fields state
  const [inputValues, setInputValues] = useState(itemInput);
  // Product Image States
  const [imgDetail, setImgDetail] = useState({
    imgUrl: "",
    imgName: "",
    localName: "",
  });
  // Auth Certificate states
  const [pdfDetails, setPdfDetails] = useState({
    pdfUrl: "",
    pdfName: "",
    pdfLocal: "",
  });
  // loading
  let [loading, setLoading] = useState(false);
  //  form component  state
  const [form, setForm] = useState(id ? true : false);

  // get All products data from Redux
  const itemSelector = useSelector((state) => {
    return state.watchReducer.items;
  });
  let [editItemId, setEditItemId] = useState("");

  // get prev detail  of selected item to edit/update
  useEffect(() => {
    let itemFilter = itemSelector.filter((val) => val.key === id);
    // setItemFilter(itemFilter)
    if (itemFilter.length) {
      setImgDetail({ imgUrl: itemFilter[0].url });
      setInputValues(itemFilter[0].inputValues);
      setEditItemId(itemFilter[0].key);
      setPdfDetails({ pdfUrl: itemFilter[0].authCertificate || "" });
    }
    // clean up function
    return () => {
      setImgDetail({ imgUrl: "" });
      setInputValues(itemInput);
      setPdfDetails({ pdfUrl: "" });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { active, account, activate } = useWeb3React();

  async function connect() {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  }

  // handle inputs change
  const handleItemsInp = (e) => {
    let { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  // select product image
  const handleWatchImg = (event) => {
    const url = URL.createObjectURL(event.target.files[0]);
    const itemImgName = event.target.files[0].name;
    setImgDetail({
      imgUrl: url,
      imgName: itemImgName,
      localName: event.target.files[0],
    });
  };

  // handle Auth Certificate
  const handlePdfSelect = (event) => {
    const url = URL.createObjectURL(event.target.files[0]);
    const itemName = event.target.files[0].name;
    setPdfDetails({
      pdfUrl: url,
      pdfName: itemName,
      pdfLocal: event.target.files[0],
    });
  };

  // upload image on storage
  const storage = firebase.storage();
  function uploadPdfAndImageOnDB(toCheck, newFiles, oldFile, nameOf, refOf) {
    return new Promise((resolve, reject) => {
      if (toCheck?.length > 0) {
        var storageRef = storage.ref(refOf + "/" + toCheck);
        let uploadTask = storageRef.put(newFiles);
        // console.log(task)
        uploadTask.on(
          "state_changed",
          function progress(snapshot) {
            // var percentage = Math.floor(
            //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            // );
          }, //  function below for error handling
          function (error) {
            console.log("erorr");
            setLoading(false);
            set_loader(false);
            set_notify({
              open: true,
              msg: `Error occurred While uploading ${nameOf} file.`,
              type: "error",
            });
          },
          function complete() {
            //This function executes after a successful upload
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then(function (downloadURL) {
                return resolve(downloadURL);
              });
          }
        );
      } else {
        return resolve(oldFile);
      }
    });
  }

  // firebase database reference
  const db = firebase.database();
  const itemsRef = db.ref(`Items`);
  // store Product form data  to firebase Database
  const handleAddAndUpdateItem = (e) => {
    e.preventDefault();
    if (imgDetail.localName || imgDetail.imgUrl || imgDetail.imgName) {
      if (pdfDetails.pdfLocal || pdfDetails.pdfUrl || pdfDetails.pdfName) {
        setLoading(true);
        set_loader(true);
        uploadPdfAndImageOnDB(
          pdfDetails.pdfName,
          pdfDetails.pdfLocal,
          pdfDetails.pdfUrl,
          "Pdf",
          "AuthCertificates"
        )
          .then((url2) => {
            uploadPdfAndImageOnDB(
              imgDetail.imgName,
              imgDetail.localName,
              imgDetail.imgUrl,
              "Product Image",
              "watchImages"
            )
              .then((url) => {
                // update or edit function
                if (id) {
                  db.ref(`Items/${id}`)
                    .update({
                      inputValues,
                      url,
                      authCertificate: url2,
                    })
                    .then(() => {
                      setLoading(false);
                      set_loader(false);
                      history.push(`/dashboard`);
                      setInputValues(itemInput);
                      handleEmptyImg();
                      handleEmptyPdf();
                      set_notify({
                        open: true,
                        msg: "Product updated Successfully!",
                        type: "success",
                      });
                    })
                    .catch((err) => {
                      console.log(err);
                      setLoading(false);
                      set_loader(false);
                      set_notify({
                        open: true,
                        msg: "item not added due to connection error",
                        type: "error",
                      });
                    });
                }
                // // add new item function
                else {
                  itemsRef
                    .push()
                    .set({
                      inputValues,
                      url,
                      authCertificate: url2,
                    })
                    .then(() => {
                      setLoading(false);
                      set_loader(false);
                      setForm(false);
                      set_notify({
                        open: true,
                        msg: "Product posted Successfully!",
                        type: "success",
                      });
                    })
                    .catch((err) => {
                      console.log(err);
                      setLoading(false);
                      set_loader(false);
                      set_notify({
                        open: true,
                        msg: "item not added due to connection error",
                        type: "error",
                      });
                    });
                }
              })
              .catch((err) => {
                setLoading(false);
                set_loader(false);
                set_notify({
                  open: true,
                  msg: "Product Image File not uploaded some error occurred!",
                  type: "error",
                });
                console.log(err);
              });
          })
          .catch((err) => {
            setLoading(false);
            set_loader(false);
            set_notify({
              open: true,
              msg: "Pdf File not uploaded some error occurred!",
              type: "error",
            });
            console.log(err);
          });
      } else {
        set_notify({
          open: true,
          msg: "Auth Certificate is required!",
          type: "error",
        });
      }
    } else {
      set_notify({
        open: true,
        msg: "Product Image is required!",
        type: "error",
      });
    }
  };

  // show add new form
  const handleTableAndForm = () => {
    setForm(true);
  };

  // go Back
  const handleBackTable = () => {
    history.push("/dashboard");
    setForm(false);
  };

  const handleEmptyImg = () => {
    setImgDetail({ imgUrl: "", imgName: "", localName: "" });
  };

  // handle unSelect Auth Certificate file
  const handleEmptyPdf = () => {
    setPdfDetails({ pdfUrl: "", pdfName: "", pdfLocal: "" });
  };

  return (
    <div className="inventoryContainer">
      <button onClick={connect} className="cus_btn">
        Connect Wallet
      </button>
      {active ? (
        <span style={{ marginLeft: "10px" }}>
          Connected with <b>{account}</b>
        </span>
      ) : (
        <span style={{ marginLeft: "10px" }}>Not connected</span>
      )}
      <br />
      {!form ? (
        active ? (
          <button className="cus_btn" onClick={handleTableAndForm}>
            Add Item
          </button>
        ) : null
      ) : null}
      <div className="inventtable">
        {form ? (
          <AddItem
            handleAddItem={handleAddAndUpdateItem}
            handleItemsInp={handleItemsInp}
            handleWatchImg={handleWatchImg}
            handlePdfSelect={handlePdfSelect}
            inputValues={inputValues}
            imgUrl={imgDetail.imgUrl}
            pdfUrl={pdfDetails.pdfUrl}
            loading={loading}
            backTable={handleBackTable}
            cross
            handleEmptyImg={handleEmptyImg}
            handleEmptyPdf={handleEmptyPdf}
          />
        ) : (
          <Inventorytable />
        )}
      </div>
    </div>
  );
};

export default Inventory;
