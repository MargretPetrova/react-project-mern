import { AuthContext } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import {CookiesProvider} from 'react-cookie'
import { Header } from './components/Header/Header';
import CreateCenter from './components/Pages/CreateCenter/CreateCenter';
import Home from './components/Pages/Home/Home.js';
import Register from './components/Pages/Register/Register'
import Login from './components/Pages/Login/Login';
import About from './components/Pages/AboutPage/About';
import Catalog from './components/Pages/Catalog/Catalog';
import Details from './components/Pages/Details/Details'
// import uniqid from 'uniqid'
import styles from './App.css';
import * as authService from './services/authService'
import { useState, useEffect } from 'react'
import { Routes, Route} from "react-router-dom";
import { ProtectedRoute } from './components/ProtectedRoutes/ProtectedRoute';
import { ProtectedRouteFromUser } from './components/ProtectedRoutes/ProtectedRouteFromUser'
import { Edit } from './components/Pages/Edit/Edit';
import ErrorPage from './components/Pages/404/ErrorPage';
import Notification from './components/Notification/Notification';
import ProfilePage from './components/Pages/ProfilePage/ProfilePage';
import {useCookies} from 'react-cookie';
import Modal from './components/Modal/Modal'


function App() {
  
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [userInfo, setUserInfo] = useState({user:''});

  useEffect(()=>{
if(cookies.user != undefined){
  setUserInfo({user: cookies.user})
}
  },[cookies])

  const isLoggedIn = (authData) => {

    setCookie('user',authData )

  }

  const isLoggedOut = () => {
  
    removeCookie('user')
    setUserInfo({userInfo:''});
    
  }
  const [showModal, setShowModal] = useState(false);
  const showModalHandler =()=>{
    setShowModal(true)
  }
  const hideModalHandler = ()=>{
    console.log('close')
    setShowModal(false)
  }


  return (
    <CookiesProvider>
    <AuthContext.Provider value={{ userInfo , isLoggedIn, isLoggedOut}}>
      <NotificationProvider>
      <div className={styles.flexCcontainer}>
        {/* <ErrorBoundary> */}
{showModal && <Modal onClose={hideModalHandler}/> }

        <Header data-testId="header" onShowModal ={showModalHandler}/>
          <Notification/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About />} />

          <Route element={<ProtectedRouteFromUser />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login /> } />
          </Route>

          <Route path="/catalog" element={<Catalog />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/create" element={<CreateCenter />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/catalog/:id/edit" element={<Edit />} />
          </Route>

          <Route path="/catalog/:id" element={<Details />} />
          
          {/* <Route path="/catalog/:id/donate" element={<Donate />} /> */}
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
        {/* </ErrorBoundary> */}
      </div>
      <footer id="site-footer">
        <p>@help</p>
      </footer>
      </NotificationProvider>
    </AuthContext.Provider>
    </CookiesProvider>


  )
}

export default App;
