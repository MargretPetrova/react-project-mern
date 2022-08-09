
import { post, get, del , put} from "./requester";

export async function createCenter(data, userToken){
    try {
        const result = await post('/data/centers/create', data,userToken);
       
    } catch (err) {
     console.log('create center' + err)
        throw err
    }


}
export async function deleteCenter(postId, userToken){
try {
    await del(`/data/centers/${postId}`, userToken)
} catch (err) {
    // console.error(err.message)
    throw err
}
}
export async function editCenter(data,postId, userToken){
    
    try {
       const result =  await put(`/data/centers/${postId}`, data,userToken);
       console.log(result)
    } catch (err) {
        // console.error(err.message)
        // console.log('edit center' + err)
        throw err
        
    }
    
}
export async function getAllCenters(){
    
    try {
       return await get('/data/centers/');
    } catch (err) {
        throw err;
    }
}


export async function getCenter(id){

try {
   return await get(`/data/centers/${id}`)
   
    
} catch (err) {
    throw err;
    
}
}

 export async function becomeVolunteer(centerId, userToken){
try {
    return await post(`/data/centers/${centerId}/volunteer`, undefined , userToken)
} catch (err) {
    throw err;
}
 }