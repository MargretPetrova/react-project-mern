const EMAIL_PATTERN = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;
const URL_PATTERN = /^https?:\/\/(.+)$/
const PHONE_PATTERN = /^0?[0-9]{9}$/


 export function emailValidation(email){
    if (!EMAIL_PATTERN.test(email)) {
        return false;
    }else{
       return true
    }
 }

 export function passwordValidation(pass){
    if (pass.length < 3) {
       return false;
    }else{
        return true
     }
 }

 export function namesValidation(name){
    if (name.length < 3) {
       return false;
    }else{
        return true
     }
 }
 
export function loginInputValidation(email, password) {
     if (emailValidation(email)=== false) {
        
        return {error : `Email must be valid and contain only english letters!`}
        // throw new Error('Email must be valid and contain only english letters!')
    }else if (passwordValidation(password) === false) {
        
        return {error : `Password must be at least 3 characters`}
        // throw new Error('Password must be at least 3 characters')
    }if (email === '' || password === '') {
        
        return {error : `All fields are requred`}
        // throw new Error(`All fields are requred`)
    }else{
       
        return true
    }
}

export function registerInputValidation(email, password, firstName, lastName, rePassword) {
    if (email == '' || password == '' || firstName == '' || lastName == '' || rePassword == "") {
        throw new Error(`All fields are requred`)
    }
    if (password != rePassword) {
        throw new Error(`Pass and RePass dont match`)

    }
    if (emailValidation(email)=== false) {
       
        throw new Error('Email must be valid and contain only english letters!')
    }
    if (passwordValidation(password) === false) {
        
        throw new Error('Password must be at least 3 characters')
    }
    if (namesValidation(firstName) === false) {
        
        throw new Error('Name must be at least 3 characters')
    }
    if (namesValidation(lastName) === false) {
        
        throw new Error('Name must be at least 3 characters')
    }

}


export function createInputValidation(name, location, address, phone, image, description) {
    if (name == '' || location == '' || address == '' || description == '' || phone == '' || image == '') {
        throw new Error('All fields are required')
    }
    if (!Number(phone)) {
        throw new Error('Phone must be a number')
    }
    if(!PHONE_PATTERN.test(phone)){
throw new Error('Phone must start with 0 and be exactly 10 numbers ')
    }
    if (!URL_PATTERN.test(image)) {
        throw new Error('Image must be a valid URL')
    }
    if (description.length < 10) {
        throw new Error('Description must be at least 10 characters')
    }
}


