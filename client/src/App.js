import { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios'
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer'
import CurrentDate from './components/CurrentDate';
import Prompt from './components/Prompt'

function App(props) {
   return (
    <>
    
        <Header />
        <CurrentDate />
        <Prompt />
        <Footer />
    </>
    ) 
}



export default App