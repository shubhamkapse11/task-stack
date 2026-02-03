const {Router} = require('express');
const {upload} = require('../middlewares/multer-middleware')
const router = Router();

router.route('/register' , upload.fields([
    {name :'profileImg' , maxCount:1} 
]))


module.exports = router;