const jo = require('@hapi/joi')
const svS = jo.object({
    name:jo.string().max(20).alphanum().required(),
    lastname:jo.string().max(20).alphanum().required(),
    password:jo.string().alphanum().min(6).max(20),
    email:jo.string().email()
    
})
module.exports=svS