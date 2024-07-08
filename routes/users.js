var express = require('express');
var router = express.Router();

const usercontroller=require('../controller/usercontroller')
 

router.get('/',usercontroller.login)
router.post('/login',usercontroller.loginpost)
router.get('/signout',usercontroller.signout)
router.get('/signup',usercontroller.signup)
router.post('/signup',usercontroller.signuppost)
router.get('/login',usercontroller.login)
router.get('/home',usercontroller.home)





module.exports = router;
 