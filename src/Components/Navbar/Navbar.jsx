import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import firebase from '../../Config/FirebaseConfig'
import { userlogOut } from '../../GlobalState/CreateSlice'
import {useNotifyContext} from "../../context/notifyContext"
import './style.css'

const AppNavbar = () => {
  const { set_notify } = useNotifyContext()
  const dispatch = useDispatch()
  const selector = useSelector((state) => {
    return state.watchReducer
  })
  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        set_notify({open: true, msg: "Logout  successfully!", type: "success"})
        dispatch(userlogOut(false))
      }).catch((err)=>{
        set_notify({open: true, msg: "Logout  failed", type: "error"})
      })
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container className="cus_navbar container">
          <NavLink className="navLinks text-white" to="/">
             Home
          </NavLink>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              {selector.isUserLogin  ? (
                <>
                { selector.currentUser.admin?
                  <NavLink className="navLinks text-white" to="/dashboard">
                    Admin Dashboard
                  </NavLink>
                  : null}
                  <button onClick={handleLogout} className='cusBtn' >Logout</button>
                </>
              ) : null
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default AppNavbar
