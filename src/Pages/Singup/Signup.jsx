// import React, { useState } from 'react'
import SignupForm from '../../Components/SignupForm'
import { useHistory } from 'react-router-dom'
import firebase from '../../Config/FirebaseConfig'
import { useFormik } from 'formik'
import * as yup from 'yup'
import {useNotifyContext} from "../../context/notifyContext"

const Signup = () => {
  const { set_notify,  set_loader,loader } = useNotifyContext()
  const history = useHistory()
  let auth = firebase.auth()
  let db = firebase.database()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      admin: false,
    },
    onSubmit: (values) => {
      set_loader(true)
      auth
        .createUserWithEmailAndPassword(values.email, values.password)
        .then((res) => {
          db.ref('users/' + res.user.uid)
            .set({ email: values.email, admin: values.admin,id:res.user.uid })
            .then(() => {
              set_notify({open: true, msg: "Signup  successfully!", type: "success"})
              set_loader(false)
              history.push('/dashboard')
            })
        })
        .catch((err) => {
          set_notify({open: true, msg: err.message, type: "error"})
          set_loader(false)
        })
    },
    validationSchema: yup.object().shape({
      email: yup.string().email('Invalid Email').required('Email is required'),
      password: yup
        .string()
        .min(6, 'password is too Short!')
        .max(20, 'password is too Long!')
        .required('password is required'),

      confirmPassword: yup
        .string()
        .test('passwords-match', 'Passwords must match', function (value) {
          return this.parent.password === value
        }),
    }),
  })
  
  return (
    <div>
      <SignupForm loading={loader} formik={formik} />
    </div>
  )
}

export default Signup
