import React from 'react'
import {NavLink} from 'react-router-dom'

const SubNavbar = () => {
    return (
        <div className='subNavbar_container '>
            <ul className="subNavbar_ul container w-100">
                <li className='subNav_list'>
                    <NavLink className='subNav_link' to=''>Buy</NavLink>
                </li>
                <li>
                    <NavLink className='subNav_link'to='' >Buy & Sell</NavLink>
                </li>
                <li>
                    <NavLink className='subNav_link' to=''>Sell</NavLink>
                </li>
                <li>
                    <NavLink className='subNav_link' to=''>Marketplace</NavLink>
                </li>
            </ul>
        </div>
    )
}

export default SubNavbar
