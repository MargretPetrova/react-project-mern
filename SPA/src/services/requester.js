import * as authService from '../services/authService'

const host = `http://localhost:3030`;

async function request(url, options) {
    try {
        const response = await fetch(host + url, options);
        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        try {
            const data = await response.json();
            return data;
        } catch (error) {
            return response;
        }
    } catch (error) {
        
        throw error;
    }
}

function createOptions(method = 'get', data) {
    const options = {
        method,
        headers: {}
    }
    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        
        options.body = JSON.stringify(data);

    }
    const userInfo = authService.getUser()
    if (userInfo != null) {
        options.headers['X-Authorization'] = userInfo.token;
        
    }
    return options;

}

export async function get(url) {
    return request(url, createOptions())
}
export async function post(url, data) {
    return request(url, createOptions('post', data))
}
export async function put(url, data) {
    return request(url, createOptions('put', data))
}
export async function del(url) {
    return request(url, createOptions('delete'))
}

// export async function logIn(email, password) {
//     const result = await post('/users/login', {
//         email,
//         password
//     });
//     const userInfo = {
//         email: result.email,
//         id: result._id,
//         token: result.accessToken
//     };
//     authService.setUser(userInfo);
// }

// export async function register(firstName, lastName, email, password) {
//     const result = await post('/users/register', {
//         firstName,
//         lastName,
//         email,
//         password
//     });

//     const userInfo = {
//         email: result.email,
//         id: result._id,
//         token: result.accessToken
//     };
//     authService.setUser(userInfo);

// }
// export async function logOut() {
//     await get('/users/logout');
//     authService.delUser();
// }