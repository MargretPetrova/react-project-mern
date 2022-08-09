import * as authService from '../services/authService'

const host = `http://localhost:3030`;

async function request(url, options) {
   
    try {
        const response = await fetch(host + url, options);
      
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
        options.headers['X-Authorization'] = userToken;
            
        }
       
      
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
    
    return request(url, createOptions('delete',undefined, userToken))
}

