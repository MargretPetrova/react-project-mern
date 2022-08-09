import { createContext, useState, useContext } from "react";

export const NotificationContext = createContext();

const types = {
    error: 'Error',
    // warn: 'warning',
    info: 'Info',
    success: 'Success',
};
const basicState = { show: false, message: '', type: types.error }



export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState(basicState);

    const addNotifications = (dataMsg, dataType) => {
        setNotifications({ show: true, message: dataMsg, type: dataType })
        setTimeout(() => {
            setNotifications(basicState);
        }, 4000);

    }

    return <NotificationContext.Provider value={{ notifications, addNotifications, types }}>
        {children}
    </NotificationContext.Provider>

}



