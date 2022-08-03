const { model, Schema, Types:{ObjectId} } = require('mongoose');

//const EMAIL_PATTERN = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;

const userSchema = new Schema({
    firstName:{ type: String, required:true, minlength:[3, 'First Name must be at least 3 characters!']},
    lastName: { type: String, required:true, minlength:[3, 'Last Name must be at least 3 characters!']},
    email: {
        type: String, required: [true, 'Email is required!'], 
        // validate: {
        //     validator(value) {
        //         return EMAIL_PATTERN.test(value);
        //     },
        //     message: 'Email must be valid and contain only english letters!'
        // }
    },
    hashedPassword: { type: String, required: true },
    ownerOf: { type: [ObjectId], ref: 'Center', default: [] },
    donations: { type: [ObjectId], ref: 'Donation', default: [] },
    volunteerIn: { type: [ObjectId], ref: 'Center', default: [] }
});


// userSchema.index({ email: 1}, {
//     collation: {
//         locale: 'en',
//         strength: 1
//     }
// });
userSchema.index({ email: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});


const User = model('User', userSchema);

module.exports = User;