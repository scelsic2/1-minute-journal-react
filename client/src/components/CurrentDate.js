import React, {useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
const dayjs = require('dayjs')

function CurrentDate(props) {
    const [currentDate, setCurrentDate] = useState('');
  
    // Current Date
    useEffect(() => {
      const theCurrentDate = dayjs().format('dddd, MMMM DD, YYYY');
      setCurrentDate(theCurrentDate);
    }, []);
  
    return (
      <>
        <div className="date-container">
          <h2 className="current-date">{currentDate}</h2>
        </div>
      </>
    );
  }
  
  export default CurrentDate;