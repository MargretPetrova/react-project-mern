import * as authService from '../services/authService'

const host = `http://localhost:3030`;

async function request(url, options) {
   
    try {
        const response = await fetch(host + url, options);
        console.log('request')
        console.log(response)
        if (response.ok == false) {
            const error = await response.json();
          
            throw new Error(error);
        }

        try {
            const data = await response.json();
            return data;
        } catch (err) {
            return response;
        }
    } catch (err) {
        
        throw err.message;
    }
}

function createOptions(method = 'get', data,userToken) {
    const options = {
        method,
        headers: {}
    }
    
    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        
        options.body = JSON.stringify(data);

    }
    // const userInfo = authService.getUser()
    // if (userInfo != null) {
    // options.headers['X-Authorization'] = userInfo.token;//////????????????????????????????????
        
    // }
   
    if (userToken != null) {
        options.headers['X-Authorization'] = userToken;//////????????????????????????????????
            
        }
        // console.log(options)
      
    return options;

}

export async function get(url, userToken) {
    
    return request(url, createOptions('get',undefined, userToken))
}
export async function post(url, data,userToken) {
    return request(url, createOptions('post', data,userToken))
}
export async function put(url, data,userToken) {
    return request(url, createOptions('put', data,userToken))
}
export async function del(url,userToken) {
    
    return request(url, createOptions('delete',undefined, userToken))/////////////????????????????
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