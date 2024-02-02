const router = require('express').Router()
const { login,sign,publishEvent,clearEvents,getEvents } = require('./controler')
const adAuth = require('./auth')

router.post('/admin/publishevent',adAuth,publishEvent)
router.post('/admin/login',login)
router.post("/admin/signin",sign)
router.get('/admin/clearevents',adAuth,clearEvents)
router.get('/admin/getevents/:page?',getEvents)
module.exports=router