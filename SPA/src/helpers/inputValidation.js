const EMAIL_PATTERN = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;
const URL_PATTERN = /^https?:\/\/(.+)$/
const PHONE_PATTERN = /^0?[0-9]{9}$/

export function loginInputValidation(email, password) {
    if (email == '' || password == '') {
        throw new Error(`All fields are requred`)
    }
    if (!EMAIL_PATTERN.test(email)) {
        throw new Error('Email must be valid and contain only english letters!')
    }
    if (password.length < 3) {
        throw new Error('Password must be at least 3 characters')
    }
}

export function registerInputValidation(email, password, firstName, lastName, rePassword) {
    if (email == '' || password == '' || firstName == '' || lastName == '' || rePassword == "") {
        throw new Error(`All fields are requred`)
    }
    if (password != rePassword) {
        throw new Error(`Enter correct password`)

    }
    if (!EMAIL_PATTERN.test(email)) {
        throw new Error('Email must be valid and contain only english letters!')
    }
    if (password.length < 3) {
        throw new Error('Password must be at least 3 characters')
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


