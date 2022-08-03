import { useContext } from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export const ProtectedRouteFromUser=({}) =>{
    const {userInfo} = useContext(AuthContext)
    console.log('protectedrouteFromUser',userInfo)
    if(userInfo && userInfo.user){
        return <Navigate to='/about' replace />
    }
    return <Outlet />;
  }