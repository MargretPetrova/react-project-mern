const router = require('express').Router();
const { isGuest, isAuth } = require('../middlewares/guards');
const { register, login, logout , findUserById} = require('../services/users');
const mapErrors = require('../utils/mapper');


router.post('/register', isGuest(), async (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    const email = req.body.email;
    try {
        if (firstName.trim() == '' || lastName.trim() == '' || password.trim() == '' || email.trim() == '') {
            throw new Error('Email and password are required');
        }

        const result = await register(firstName.trim(), lastName.trim(),email.trim().toLowerCase(), password.trim() );
        res.status(201).json(result);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
});

router.post('/login', isGuest(), async (req, res) => {
    try {
        const result = await login(req.body.email.trim(), req.body.password.trim());
        res.json(result);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
});

router.get('/logout', (req, res) => {
    logout(req.user.token);
    res.status(204).end();
});

router.get('/profile', isAuth(), async (req, res) => {
    //     const posts = await getPostsByAuthor(req.session.user._id)//).map(postViewModel);  //if you use .lean() in the post service, you dont have to map to model 
    //     res.render('profile', { title: 'My Posts', posts })
    const user = await findUserById(req.user._id);
    res.json(user);
    })

module.exports = router;