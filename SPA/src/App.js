import { AuthContext } from './contexts/AuthContext';
import { NotificationContext } from './contexts/NotificationContext';
import { Header } from './components/Header/Header';
import CreateCenter from './components/createCenter/CreateCenter';
import Home from './components/Home/Home.js';
import Register from './components/Register/Register'
import Login from './components/Login/Login';
import About from './components/AboutPage/About';
import Catalog from './components/Catalog/Catalog';
import Search from './components/Search/Search';
import Details from './components/Details/Details'
// import uniqid from 'uniqid'
import styles from './App.css';
import * as authService from './services/authService'
import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from './components/ProtectedRoute';
import { ProtectedRouteFromUser } from './components/ProtectedRouteFromUser'
import { Edit } from './components/Edit/Edit';
import ErrorPage from './components/404/ErrorPage';
import Notification from './components/Notification/Notification';
// import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'

function App() {
   
  const [userInfo, setUserInfo] = useState()

  const isLoggedIn = () => {
    const user = authService.getUser()
    setUserInfo({ user });
    
  }

  const isLoggedOut = () => {
    authService.delUser()
    setUserInfo({ })
  }
  const types = {
    error: 'Error',
    // warn: 'warning',
    info: 'Info',
    success: 'Success',
};
const initialNotificationsState = {show: false, message: '', type: types.error}
const [notifications, setNotifications] = useState(initialNotificationsState);
const addNotifications=(dataMsg, dataType)=>{
    setNotifications({show:true, message: dataMsg, type: dataType})
    setTimeout(() => {
        setNotifications(initialNotificationsState);
    }, 3000);

}
 

  console.log('appjs',userInfo)
  console.log('appjs', notifications)
  return (
    <AuthContext.Provider value={{ userInfo, isLoggedIn, isLoggedOut }}>
      <NotificationContext.Provider value={{notifications,addNotifications, types }}>
      <div className={styles.flexCcontainer}>
      
        {/* <ErrorBoundary> */}

        <Header />
        
          {/* <Notification/> */}
         
        
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
            <Route path="/search" element={<Search />} />
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
      </NotificationContext.Provider>
    </AuthContext.Provider>


  )
}

export default App;
