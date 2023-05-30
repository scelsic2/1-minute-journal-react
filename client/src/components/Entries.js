import { FiEdit, FiDelete } from 'react-icons/fi'
import React, {useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
const dayjs = require('dayjs')


function Entries(props) {
    const [currentDate, setCurrentDate] = useState('');
    
    return (
      <>
        <section className='entries-section'>
            <div className='entry-div'>
                <h5 className='entry-date'>05/23/23 6:15pm</h5>
                <h4 className='entry-prompt'>What was the funniest thing that happened today?</h4>
                <p className='entry-text'>When the cat wouldn't stop screaming when Nick came home!</p>
                <div className='edit-delete-div'>
                <FiEdit color="var(--header-color)" fontSize={20}/>
                <FiDelete color="var(--header-color)" fontSize={20}/>
                </div>
            </div>
        </section>
      </>
    );
  }
  
  export default Entries;