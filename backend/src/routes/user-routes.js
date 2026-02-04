const {Router} = require('express');
const {upload} = require('../middlewares/multer-middleware')
const router = Router();
const {userRegister , logIn} = require('./../controllers/user-controller')

router.route('/register').post(upload.single('avatar'),userRegister)
router.route('/login').post(logIn)


module.exports = router;