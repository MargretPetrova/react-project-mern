const router = require('express').Router();
const { isGuest, isAuth } = require('../middlewares/guards');
const { register, login, logout , findUserById} = require('../services/users');
const mapErrors = require('../utils/mapper');

const attachCookie = (token, res) => {
    return res.cookie(process.env.COOKIE_NAME, token, {
        sameSite: "none",
        secure: true,
    })
}
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
        attachCookie(result, res)
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
        attachCookie(result, res)
       
        res.json(result);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME) //??????????
    // logout(req.user.token);
    res.status(204).end();
});

router.get('/profile', isAuth(), async (req, res) => {
    //     const posts = await getPostsByAuthor(req.session.user._id)//).map(postViewModel);  //if you use .lean() in the post service, you dont have to map to model 
    //     res.render('profile', { title: 'My Posts', posts })
    // console.log(req.user._id)
    const user = await findUserById(req.user._id);
    res.json(user);
    })

module.exports = router;