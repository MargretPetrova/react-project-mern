import { AuthContext } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import {CookiesProvider} from 'react-cookie'
import { Header } from './components/Header/Header';
import CreateCenter from './components/CreateCenter/CreateCenter';
import Home from './components/Home/Home.js';
import Register from './components/Register/Register'
import Login from './components/Login/Login';
import About from './components/AboutPage/About';
import Catalog from './components/Catalog/Catalog';
import Details from './components/Details/Details'
// import uniqid from 'uniqid'
import styles from './App.css';
import * as authService from './services/authService'
import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from './components/ProtectedRoutes/ProtectedRoute';
import { ProtectedRouteFromUser } from './components/ProtectedRoutes/ProtectedRouteFromUser'
import { Edit } from './components/Edit/Edit';
import ErrorPage from './components/404/ErrorPage';
import Notification from './components/Notification/Notification';
import ProfilePage from './components/ProfilePage/ProfilePage';
import {useCookies} from 'react-cookie'
// import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'

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
    // setUserInfo({userInfo: cookies.user})
    // const user = authService.getUser()
    // setUserInfo({ user });
    // setUserInfo({userInfo: infoFromCookies.user})
  }

  const isLoggedOut = () => {
    // authService.delUser()
    // setUserInfo({});
    removeCookie('user')
    setUserInfo({userInfo:''});
    
  }

  return (
    <CookiesProvider>
    <AuthContext.Provider value={{ userInfo , isLoggedIn, isLoggedOut}}>
      <NotificationProvider>
      <div className={styles.flexCcontainer}>
        {/* <ErrorBoundary> */}
        <Header />
          <Notification/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route element={<ProtectedRouteFromUser />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login/> } />
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
