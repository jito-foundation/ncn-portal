import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import firebase from "../../../Config/FirebaseConfig";
import { useHistory } from "react-router-dom";
import AddItem from "./ItemForm";
import { useNotifyContext } from "../../../context/notifyContext";

// initialized form fields
const itemInput = {
  eventName: "",
  description: "",
  dificulty: "",
  endDate: "",
  investMin: "",
  investMax: "",
  rewardMin: "",
  rewardMax: "",
  startDate: "",
  numberOfDays: "",
};

const EditItem = () => {
  const { set_notify, set_loader } = useNotifyContext();
  const history = useHistory();
  let { id } = useParams();
  // all other form fields
  const [inputValues, setInputValues] = useState(itemInput);
  // product image states
  const [imgUrl, setImgurl] = useState("");
  const [imgName, setImgName] = useState("");
  const [local, setLocal] = useState("");
  // Auth certificate States
  const [pdfUrl, setIPdfUrl] = useState("");
  const [pdfName, setPdfName] = useState("");
  const [pdfLocal, setPdfLocal] = useState("");
  //
  let [itemFilterArr, setItemFilter] = useState([]);
  let [editItemId, setEditItemId] = useState("");
  let [loading, setLoading] = useState(false);
  const db = firebase.database();

  // get All products data from Redux
  const itemSelector = useSelector((state) => {
    return state.watchReducer.items;
  });

  // get prev detail  of selected item to edit/update
  useEffect(() => {
    let itemFilter = itemSelector.filter((val) => val.key === id);
    setItemFilter(itemFilter);
    if (itemFilter.length) {
      setImgurl(itemFilter[0].url);
      setInputValues(itemFilter[0].inputValues);
      setEditItemId(itemFilter[0].key);
      setIPdfUrl(itemFilter[0].authCertificate || "");
    }
  }, []);

  // handle inputs change
  const handleItemsInp = (event) => {
    setInputValues({ ...inputValues, [event.target.name]: event.target.value });
  };

  // Product image file select
  const handleWatchImg = (event) => {
    const url = URL.createObjectURL(event.target.files[0]);
    const goalImgName = event.target.files[0].name;
    setImgurl(url);
    setImgName(goalImgName);
    setLocal(event.target.files[0]);
  };

  // pdf select
  const handlePdfSelect = (event) => {
    const url = URL.createObjectURL(event.target.files[0]);
    const itemName = event.target.files[0].name;
    setIPdfUrl(url);
    setPdfName(itemName);
    setPdfLocal(event.target.files[0]);
  };

  // firebase storage ref
  const storage = firebase.storage();
  // firebase database reference
  const itemsRef = db.ref(`Items/` + editItemId);

  // unselect product image
  const handleEmptyImg = () => {
    setImgurl("");
    setImgName("");
    setLocal("");
  };

  // unselect Certificate file
  const handleEmptyPdf = () => {
    setIPdfUrl("");
    setPdfName("");
    setPdfLocal("");
  };

  // upload image on storage
  function uploadPdfOnDB(toCheck, newFiles, oldFile, nameOf, refOf) {
    return new Promise((resolve, reject) => {
      if (toCheck?.length > 0) {
        let task;
        var storageRef = storage.ref(refOf + "/" + toCheck);
        task = storageRef.put(newFiles);
        task.on(
          "state_changed",
          function progress(snapshot) {
            // var percentage = Math.floor(
            //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            // );
          }, //  function below for error handling
          function (error) {
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
            task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
              return resolve(downloadURL);
            });
          }
        );
      } else {
        return resolve(oldFile);
      }
    });
  }

  // update goals in database
  const handleUpdateItem = (e, tokenId) => {
    e.preventDefault();
    if (local || imgUrl || imgName) {
      if (pdfLocal || pdfUrl || pdfName) {
        setLoading(true);
        set_loader(true);
        uploadPdfOnDB(pdfName, pdfLocal, pdfUrl, "Pdf", "AuthCertificates")
          .then((url2) => {
            uploadPdfOnDB(
              imgName,
              local,
              imgUrl,
              "Product Image",
              "watchImages"
            )
              .then((url) => {
                itemsRef
                  .update({
                    id: editItemId,
                    tokenId: tokenId,
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

  // loading
  if (!itemFilterArr.length) {
    return (
      <div>
        <p>Loading</p>
      </div>
    );
  }
  return (
    <AddItem
      handleAddItem={handleUpdateItem}
      handleItemsInp={handleItemsInp}
      handleWatchImg={handleWatchImg}
      handlePdfSelect={handlePdfSelect}
      inputValues={inputValues}
      imgUrl={imgUrl}
      pdfUrl={pdfUrl}
      loading={loading}
      backLink
      handleEmptyImg={handleEmptyImg}
      handleEmptyPdf={handleEmptyPdf}
      cross
      editForm={true}
    />
  );
};

export default EditItem;
