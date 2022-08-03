const router = require('express').Router();
const api = require('../services/centers');
const { isAuth, isOwner } = require('../middlewares/guards');
const mapErrors = require('../utils/mapper');
const preload = require('../middlewares/preload');


router.get('/', async (req, res) => {
    
    console.log(req.user);
    const data = await api.getAll();
    res.json(data);
});

router.post('/create', isAuth(), async (req, res) => {
    
const center = {
    name: req.body.name,
    location: req.body.location,
    address:req.body.address,
    phone: req.body.phone,
    image: req.body.image,
    description: req.body.description,
    ownerId: req.user._id
    //volunteers donations:?

}
    try {
        const result = await api.create(center);
        res.status(201).json(result);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
});

router.get('/:id', preload(), (req, res) => {// getails
    const center = res.locals.center;
    res.json(center);
});

router.put('/:id', preload(), isOwner(), async (req, res) => {// edit
    const centerId = req.params.id;
    const center = {
        name: req.body.name,
        location: req.body.location,
        address:req.body.address,
        phone: req.body.phone,
        image: req.body.image,
        description: req.body.description
    }

    try {
        const result = await api.update(centerId, center);
        res.json(result);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
});

router.delete('/:id', preload(), isOwner(), async (req, res) => {// delete
    try {
        const centerId = req.params.id;
        
        await api.deleteById(centerId);
        res.status(204).end();
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
});
router.post('/:id/volunteer', isAuth(), async (req, res)=>{
    const centerId = req.params.id;
    
    const userId =  req.user._id;
    
   
    try {
                const result = await api.volunteer(centerId,userId);
                res.json(result);
            } catch (err) {
                console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
            }


})
router.post('/:id/:donation', isAuth(), async (req, res)=>{
    const centerId = req.params.id;
    const userId =  req.session.user._id
    const donation = {
        kind: req.body.kind,
        date: req.body.date,
        quantyty: req.body.quantyty,
        donatorId: userId,
        centerId: centerId
    }
    try {
                const result = await api.donate(centerId , donation);
                res.json(result);
            } catch (err) {
                console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
            }


})

// router.get('/profile', isUser(), async (req, res) => {
//     const posts = await getPostsByAuthor(req.session.user._id)//).map(postViewModel);  //if you use .lean() in the post service, you dont have to map to model 
//     res.render('profile', { title: 'My Posts', posts })
// })




module.exports = router;