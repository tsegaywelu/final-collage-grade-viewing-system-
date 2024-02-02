const jwt = require('jsonwebtoken')
const Admin = require('./model')
async function isauth(req,res,next){
    try {
        const token = req.headers.authtoken
        //console.log(req.headers)
    console.log(token)
        if(token&&token.includes('bearer')){
            
            const T =token.split(' ')[1];
            const user = await jwt.verify(T,process.env.jtSec)
        
            if(user.id){
                const adm = await Admin.findById(user.id);
                if(adm&&adm.role=="admin"){next()}
                else{
            console.log('auth error');
                    res.status(401).json({error:true,message:"unauthorized"})
                
            }
            
        }
    
    }else{
        res.status(404).json({
            error:true,
            message:"it seems you did not login before"
        })
    }

    } catch (e) {
        res.status(401).json({
            error:true,
            message:'can not find you !'
        })
    }
}
module.exports= isauth