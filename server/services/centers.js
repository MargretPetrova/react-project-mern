const Center = require('../models/Center');
const Donation = require('../models/Donation');
const User = require('../models/User');



async function getAll() {
    return Center.find({});
}

async function create(item) {
    const result = new Center(item);
    await result.save();

    return result;
}

function getById(id) {
    return Center.findById(id).lean()
    .populate('volunteers', 'firstName lastName')

}

async function update(id, center) {
    const existing = await Center.findById(id);

    existing.name = center.name;
    existing.location = center.location;
    existing.address = center.address;
    existing.description = center.description;
    existing.phone = center.phone;
    existing.image = center.image;
    

    await existing.save();

    return existing;
}

async function deleteById(id) {
    await Center.findByIdAndDelete(id);
}

async function volunteer(centerId, userId){
    const center = await Center.findById(centerId);
   

    if (center.volunteers.includes(userId)) {
        throw new Error('User had allready become a volunteer!')
    }
    center.volunteers.push(userId);
    await center.save();
    

}
// async function getUserById(userId){
//    const info =  await User.findById(userId)
// }
async function createDonation(donation) {
    const result = new Donation(donation);
    await result.save();

    return result;
}
async function donate(centerId, donation){
    const makedDonation = await createDonation(donation);

    const center = await Center.findById(centerId);

    center.donations.push(makedDonation._id);
    await center.save();
}




module.exports = {
    getAll,
    create,
    getById,
    update,
    deleteById, volunteer, donate, createDonation
};