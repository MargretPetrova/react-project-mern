
import { post, get, del , put} from "./requester";

export async function createCenter(data, userId){
    try {
        await post('/data/centers/create', data);
    } catch (err) {
        console.error(err.message)
    }


}
export async function deleteCenter(postId){
try {
    await del(`/data/centers/${postId}`)
} catch (err) {
    console.error(err.message)
}
}
export async function editCenter(data,postId){
    try {
        await put(`/data/centers/${postId}`, data)
    } catch (err) {
        console.error(err.message)
        
    }
    
}
export async function getAllCenters(){
    
    try {
       return await get('/data/centers/');
    } catch (err) {
        throw err.message;
    }
}


export async function getCenter(id){

try {
   return await get(`/data/centers/${id}`)
   
    
} catch (err) {
    throw err.message;
    
}
}

 export async function becomeVolunteer(centerId, userId){
try {
    return await post(`/data/centers/${centerId}/volunteer`)
} catch (err) {
    throw err.message;
}
 }