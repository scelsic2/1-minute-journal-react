import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/images/package.png'
import { GiHamburgerMenu } from 'react-icons/gi';
import { FiBookOpen } from 'react-icons/fi';
import { BsPersonCircle } from 'react-icons/bs'

function Header({isLoggedIn}) {
    
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate();
    
    const toggleMenu = () => {
        setIsOpen((open) => !open)
    }

    const handleEntriesClick = () => {
        if (isLoggedIn) {
          navigate('/entries');
        } else {
          navigate('/');
        }
      };

    const handleProfileClick = () => {
        if (isLoggedIn) {
        navigate('/settings');
        } else {
        navigate('/');
        }
    };

    return (

        <>
            <header>

            <div className='left'>
                <img src={logo} height='30px' className='logo'/>
                <h3 className='title'>1-Minute Journal</h3>
            </div>

            <div className='nav-div'>

                <nav className='mobile' onClick={toggleMenu}>
                    <GiHamburgerMenu color='var(--accent)' fontSize={25}/>
                </nav>

                <nav className={`right ${isOpen ? 'is-open' : ''}`}>
                    <a onClick={handleEntriesClick} href='/entries'><FiBookOpen color='var(--accent)' fontSize={23}/></a>
                    <a onClick={handleProfileClick} href='/profile'><BsPersonCircle color='var(--accent)' fontSize={20}/></a>
                </nav>

            </div>


            </header>
        </>
        
    )
}

export default Header