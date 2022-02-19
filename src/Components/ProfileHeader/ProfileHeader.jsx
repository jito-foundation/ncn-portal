import React from 'react'
import {Link} from 'react-router-dom'
import {FaUserCircle} from 'react-icons/fa'
import {useSelector} from 'react-redux'
import './style.css'
// assets 
import avater from '../../Assets/avater.png'

const ProfileHeader = () => {

  const selector = useSelector((state)=>{
    return state.watchReducer
  })
  // console.log(selector)

    return (
        <div className='profileHeader_container container'>
            <div className="profileHead_md">
              <img className='proImg' src={avater} alt="..." />
              <div className="profil_loginLink">
                <FaUserCircle className='pro_icon' />
                {!selector.isUserLogin?
                <Link className='login_link' to='/login' >Login/Register</Link>
             : ( <span>{selector.currentUser.email}</span> ) }
              </div>
            </div>
        </div>
    )
}

export default ProfileHeader
