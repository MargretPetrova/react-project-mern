const { getById } = require('../services/centers');


module.exports = () => async (req, res, next) => {
    const id = req.params.id;
    try {
        const center = await getById(id).lean();
        // center._ownerId = center.owner;
        res.locals.center = center;
        next();
    } catch (err) {
        console.error(err);
        res.status(404).json({ message: 'Record not found' });
    }
};