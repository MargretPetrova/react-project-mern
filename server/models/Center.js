
const { model, Schema, Types: { ObjectId } } = require('mongoose');

const centerSchema = new Schema({
    name: { type: String},
    location:{ type: String},
    address: { type: String},
    phone: { type:Number},
    image:{ type: String},
    description:{ type: String},
    volunteers:{ type: [ObjectId], ref: 'User', default:[]},
    donations: { type: [ObjectId], ref: 'Donation' },
    ownerId: { type: ObjectId, ref: 'User'}
});

const Center = model('Center', centerSchema);

module.exports = Center; 