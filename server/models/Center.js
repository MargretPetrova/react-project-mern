
const { model, Schema, Types: { ObjectId } } = require('mongoose');

const URL_PATTERN = /^https?:\/\/(.+)$/

const centerSchema = new Schema({
    name: { type: String, required:true},
    location:{ type: String, required:true},
    address: { type: String, required:true},
    phone: { type:Number, required:true},
    image: {
        type: String, validate: {
            validator(value) {
                return URL_PATTERN.test(value)
            },
            message: 'Image must be a valid URL'
        }
    },
    description:{ type: String, required:true, minlength:[10, 'Description must be min 10 characters']},
    volunteers:{ type: [ObjectId], ref: 'User', default:[]},
    donations: { type: [ObjectId], ref: 'Donation' , default:[]},
    ownerId: { type: ObjectId, ref: 'User'}
});

const Center = model('Center', centerSchema);

module.exports = Center; 