const {Router} = require('express');
const {upload} = require('../middlewares/multer-middleware')
const router = Router();
const {userRegister} = require('./../controllers/user-controller')

router.route('/register').post(upload.single('avatar'),userRegister)


module.exports = router;