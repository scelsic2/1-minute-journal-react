import { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import CurrentDate from './components/CurrentDate';
import Landing from './components/Landing';
import Prompt from './components/Prompt';
import Login from './components/Login';
import Register from './components/Register';
import Entries from './components/Entries'
import PrivateRoute from './components/PrivateRoute';

function App(props) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('/auth/userauth').then((res) => {
      setUser(res.data.user);
    });
  }, []);

  // console.log("does this run twice?")
  return (
    <>
      <Header user={user} setUser={setUser} />
      {window.location.pathname !== '/entries' && <CurrentDate />}
      {/* { user ? 'logged in' : 'not logged in '}
      { JSON.stringify(user) } */}
      <main>
      <Routes>

        <Route 
          path='/entries' 
          element={ 
            <PrivateRoute user={user}>
              <Entries user={user} setUser={setUser} /> 
            </PrivateRoute>
          } 
        />

        <Route path='/prompt' element={ 
          <PrivateRoute user={user}>
            <Prompt user={user} setUser={setUser} /> 
          </PrivateRoute>
        } 
        />     


        { user && user.email && (
          <>
            <Route path='/' element={ <Landing user={user} setUser={setUser} /> } />
            <Route path='/login' element={ <Navigate to='/prompt' />} />
            <Route path='/register' element={ <Navigate to='/prompt' />} />
          </>
        )}

        { !user && (
          <>
            <Route path='/' element={ <Landing user={user} setUser={setUser} /> } />
            <Route path='/login' element={ <Login setUser={setUser} /> } />
            <Route path='/register' element={ <Register setUser={setUser} /> } />
          </>
        )}




      </Routes>
      </main>
      <Footer />
    </>
  );
}


export default App;