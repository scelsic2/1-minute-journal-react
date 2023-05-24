import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/images/package.png'

function Header(props) {
    return (

        <>
            <header>

            <img src={logo} height="30px" className="logo"/>
            <h3 className="title">1-Minute Journal</h3>

            </header>
        </>
        
    )
}

export default Header