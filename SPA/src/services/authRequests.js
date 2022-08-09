import { post, get } from "./requester";
import * as authService from '../services/authService'


export async function logIn(email, password) {
    const result = await post('/users/login', {
        email,
        password
    });
    const userInfo = {
        email: result.email,
        id: result._id,
        token: result.accessToken
    };
    return result;
    // authService.setUser(userInfo);
    // return userInfo;
    // return {msg:'Success', data: userInfo}
}

export async function register(firstName, lastName, email, password) {
    const result = await post('/users/register', {
        firstName,
        lastName,
        email,
        password
    });

    const userInfo = {
        email: result.email,
        id: result._id,
        token: result.accessToken
    };
    // authService.setUser(userInfo);
    return result

}
export async function logOut() {
    try {
        await get('/users/logout' );
        
    } catch (err) {
        throw err.message
    }
    
    // authService.delUser();
}
export async function getCurrentUser(token){
    try {
       
        return await get(`/users/profile`, token)
    } catch (err) {
        throw err.message
    }
    
}