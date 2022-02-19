import React, { useState } from "react";
import LoginForm from "../../Components/LoginForm";
import { useHistory } from "react-router-dom";
import firebase from "../../Config/FirebaseConfig";
import "./login.css";
import {useNotifyContext} from "../../context/notifyContext"

const inputFieldValue = {
  email: "",
  password: "",
};

const Login = () => {
  const history = useHistory();
  const { set_notify,  set_loader,loader } = useNotifyContext()
  let auth = firebase.auth();
  const [loginInputs, setLoginInputs] = useState(inputFieldValue);
  const handleChangeLoginInputs = (event) => {
    setLoginInputs({
      ...loginInputs,
      [event.target.name]: event.target.value,
    });
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    set_loader(true);
    let { email, password } = loginInputs;
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userLogin) => {
        set_loader(false);
        set_notify({open: true, msg: "Login  successfully!", type: "success"})
        set_loader(false)
        history.push("/dashboard");
      })
      .catch((error) => {
        set_notify({open: true, msg: error.message, type: "error"})
        set_loader(false);
      });
    setLoginInputs(inputFieldValue);
  };

  return (
    <div>
      <LoginForm
        handleChange={handleChangeLoginInputs}
        handleSubmit={handleLoginSubmit}
        inputsValues={loginInputs}
        loader={loader}
      />
    </div>
  );
};

export default Login;
