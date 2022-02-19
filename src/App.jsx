import React, { useEffect, useState } from 'react'
import './Assets/css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import AppRouter from './Router/Router.jsx'
import firebase from 'firebase'
import {
  isLogin,
  setCurrentUser,
  setWatchItems,
} from './GlobalState/CreateSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'

function getLibrary(provider) {
    return new Web3(provider)
}

function App() {
  let [loading, setLoading] = useState(true)
  let auth = firebase.auth()
  let db = firebase.database()
  const dispatch = useDispatch()

  const selector = useSelector((state) => {
    return state.watchReducer
  })

  useEffect(() => {
    setLoading(true)
    auth.onAuthStateChanged((user) => {
      if (user) {
        const dbRef = db.ref('users/' + user.uid)
        dbRef.on('value', (snapshot) => {
          const userData = snapshot.val()
          dispatch(setCurrentUser(userData))
        })
        dispatch(isLogin(true))
        setLoading(false)
      } else {
        setLoading(false)
      }
    })
    db.ref('Items').on('value', (snapshot) => {
      let itemArray = []
      snapshot.forEach((items) => {
        const item = items.val()
        const itemKey = items.key
        item.key = itemKey
        itemArray.push(item)
      })
      dispatch(setWatchItems(itemArray))
    })
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className="App">
        <AppRouter isUser={selector.isUserLogin} cUser={selector.currentUser} />
      </div>
    </Web3ReactProvider>
  )
}

export default App
