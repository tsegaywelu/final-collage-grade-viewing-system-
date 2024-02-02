const express = require('express')
const router = express.Router();
const adAuth = require('./admin/auth')
const {createUser,
    updateUser,
    deleteUser,
    getUser,
    importRecored,
    studentContact,
    passedStudents,
    getContacts,
    deleteContact,
    imageUpload,
    getstudentAdmin
} = require('./controler');
//const { route } = require('./routes');
router.post('/create',adAuth,createUser)
router.delete('/del/:id',adAuth,deleteUser)
router.get('/',(req,res)=>res.end('********'))
router.post('/uploads',adAuth,importRecored)
router.post('/imagesupload',adAuth,imageUpload)
router.get('/single/:id',getUser)
router.put('/update/:studentId',adAuth,updateUser)
router.post('/contact',studentContact)
router.get('/contacts',adAuth,getContacts)
router.get('/dashboard',adAuth,passedStudents)
router.get('/admin/getstudent/:id',adAuth,getstudentAdmin)
router.delete('/contact/:id',adAuth,deleteContact)
module.exports = router;
