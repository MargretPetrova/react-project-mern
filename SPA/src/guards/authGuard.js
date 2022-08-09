export function isOwnerFunc(ownerId, userId){

    if (ownerId === userId) {
       return true;
       
    } else {
        return false;
    }
}
export function isVolunteer(volunteers, userId){
    if(volunteers){
        let finded =volunteers.find(x=> x._id == userId)
        return finded;
    }
}
  