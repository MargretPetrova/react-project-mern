const { model, Schema, Types: { ObjectId } } = require('mongoose');

const donationSchema = new Schema({
    kind: { type: String, required: [true, 'kind is required'] },
    date: {
        type: Number,
        
    },
    quantyty: { type: Number },
    donatorId: { type: ObjectId, ref: 'User' },
    centerId: { type: ObjectId, ref: 'Center'}
});

const Donation = model('Donation', donationSchema);

module.exports = Donation; // change item