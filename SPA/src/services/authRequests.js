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
    authService.setUser(userInfo);
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
    authService.setUser(userInfo);

}
export async function logOut() {
    await get('/users/logout');
    authService.delUser();
}
export async function getCurrentUser(userId){
    try {
        return await get(`/users/profile`)
    } catch (err) {
        throw err.message
    }
    
}