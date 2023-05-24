import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import github from '../assets/images/github-mark.png'

function Footer(props) {
    return (

        <>
            <footer>

            {/* <div className='footer-buttons'>
                <button className='new-prompt prompt-button'>New Prompt</button>
                <button className='clear-prompt prompt-button'>Clear Prompt</button>
            </div> */}

            <div className='footer-links'>
                <a href='https://github.com/scelsic2/1-minute-journal-react'>
                    <img src={github} height='20px'></img>
                </a>
                <a className='credits' href='https://www.flaticon.com/free-icon/package_6627260?related_id=6627260'>FlatIcon</a>
            </div>

            </footer>
        </>
        
    )
}

export default Footer