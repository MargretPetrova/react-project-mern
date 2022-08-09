
import { useContext } from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

export const ProtectedRoute = ({}) => {
   
       const {userInfo}= useContext(AuthContext)
       
   if (!userInfo.user) {
     return <Navigate to='/login' replace />;
   }
 
   return <Outlet />;
 };
 
