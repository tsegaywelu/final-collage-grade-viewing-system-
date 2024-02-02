const jo = require('@hapi/joi')
const vS = jo.object({
    password:jo.string().alphanum().min(6).max(20),
    email:jo.string().email()
})
module.exports=vS