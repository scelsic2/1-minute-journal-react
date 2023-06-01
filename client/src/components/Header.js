import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/images/package.png'
import { GiHamburgerMenu } from 'react-icons/gi';
import { FiBookOpen } from 'react-icons/fi';
import { BsPersonCircle } from 'react-icons/bs';
import { ImPencil2 } from 'react-icons/im';
import { IoMdLogOut } from 'react-icons/io';
import axios from 'axios';

function Header({ user, setUser }) {
    
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate();
    
    const toggleMenu = () => {
        setIsOpen((open) => !open)
    }

    const handleLandingClick = () => {
      if (user) {
        navigate('/');
      } else {
        navigate('/');
      }
    };

    const handlePromptClick = () => {
        if (user) {
          navigate('/prompt');
        } else {
          navigate('/');
        }
      };

    const handleEntriesClick = () => {
        if (user) {
          navigate('/entries');
        } else {
          navigate('/');
        }
      };

    // const handleProfileClick = () => {
    //     if (user) {
    //     navigate('/settings');
    //     } else {
    //     navigate('/');
    //     }
    // };

    const handleLogoutClick = async (event) => {
        event.preventDefault();
        await axios.get('/auth/logout')
        setUser(null)
        navigate('/')
    }

    return (

        <>
            <header>

            <div className='left'>
                <a onClick={handleLandingClick}>
                <img src={logo} height='30px' className='logo'/>
                </a>
                <h3 className='title'>1-Minute Journal</h3>
            </div>

            <div className='nav-div'>

                <nav className='mobile' onClick={toggleMenu}>
                    <GiHamburgerMenu color='var(--accent)' fontSize={25}/>
                </nav>

                <nav className={`right ${isOpen ? 'is-open' : ''}`}>
                    <a onClick={handlePromptClick} href='/prompt'><ImPencil2 color='var(--accent)' fontSize={21}/></a>
                    <a onClick={handleEntriesClick} href='/entries'><FiBookOpen color='var(--accent)' fontSize={23}/></a>
                    {/* <a onClick={handleProfileClick} href='/profile'><BsPersonCircle color='var(--accent)' fontSize={20}/></a> */}
                    {user && (
                    <a onClick={handleLogoutClick} href='/'><IoMdLogOut color='var(--accent)' fontSize={23}/></a>
                    )}
                </nav>

            </div>


            </header>
        </>
        
    )
}

export default Header