const {Router} = require('express');
const {upload} = require('../middlewares/multer-middleware')
const router = Router();
const {userRegister , logIn} = require('./../controllers/user-controller')
const authVerify = require('../middlewares/auth-middleware');

router.route('/register').post(upload.single('avatar'),userRegister)
router.route('/login').post(logIn)
router.route('/test').get(authVerify)


module.exports = router;