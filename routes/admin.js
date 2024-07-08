var express = require('express');
var router = express.Router();

const admincontroller=require('../controller/admincontroller')

 


router.get('/dashboard',admincontroller.dashboard)
router.get('/login',admincontroller.login)
router.post('/login',admincontroller.loginpost)
router.post('/create',admincontroller.createpost)
router.get('/create',admincontroller.displaycreate)
router.get('/delete/:id', admincontroller.deleteid);
router.get('/edit/:id', admincontroller.edit);
router.post('/update/:id', admincontroller.update);
router.get('/logout', admincontroller.logout);



module.exports = router;
