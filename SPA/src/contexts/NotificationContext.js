import { createContext, useState} from "react";

export const NotificationContext = createContext();

// export const types = {
//     error: 'error',
//     // warn: 'warning',
//     info: 'info',
//     success: 'success',
// };
// const initialNotificationsState = {show: false, message: '', type: types.error}

// export const NotificationProvider=({children})=>{
//     const [notifications, setNotifications] = useState(initialNotificationsState);
//     const addNotifications=(dataMsg, dataType)=>{
//         setNotifications({show:true, message: dataMsg, type: dataType})
//         setTimeout(() => {
//             setNotifications(initialNotificationsState);
//         }, 5000);

//     }
//     return 
//     <NotificationContext.Provider value={{ notifications, addNotifications }}>
//             {children}
//         </NotificationContext.Provider>
// }
// const [userInfo, setUserInfo] = useState()

//   const isLoggedIn = () => {
//     const user = authService.getUser()
//     setUserInfo({ user });
    
//   }

//   const isLoggedOut = () => {
//     authService.delUser()
//     setUserInfo({ })
//   }
 