const {Router} = require('express');
const upload = require('../middlewares/multer-middleware')
const router = Router();

router.route('/register' , upload.feilds([
    {name :'profileImg' , maxCount:1} ,
    {}
]))


module.exports = router;