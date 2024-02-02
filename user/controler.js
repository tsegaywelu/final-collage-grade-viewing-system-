const mongoose = require('mongoose')
const User = require('./userSchema')
const csvtojson = require('csvtojson')
const fsX = require('fs-extra')
const z = require('adm-zip')
const path = require('path')
const fs = require('fs')
const { parse } = require('csv-parse/sync');
const Contact = require('./contactModel')
const joi = require('@hapi/joi');
const { message } = require('./admin/valid');

////

module.exports = {
   
    createUser:async (req,res)=>{
     
     try {
        // const file = req.files.profileImage
        // if(file){
        //     file.mv(path.join(__dirname,"images"),(er)=>{
        //         if(er) throw 'image upload failed'
               
        //     })
        // }
        const {name,middlename,lastname,result,id,schoolId,schoolname,percentile } = req.body.student;
        console.log(lastname)
        const CreatV = joi.object({
            name:joi.string().min(2).max(100),
            middlename:joi.string().min(2).max(100),
            lastname:joi.string().min(2).max(100),
            id:joi.string().min(2).max(100).alphanum(),
            schoolId:joi.string().min(2).max(100).alphanum(),
            schoolname:joi.string().min(2).max(100)
        })
        const {errr,valid} = CreatV.validate({name,middlename,lastname,id,schoolId,schoolname })
        if(errr) return res.status(400).send({
            error:true,message:errr
        })
        console.log(req.body)
        console.log('creating user')
        const user = await new User(req.body.student)
        console.log(result)
        let total = 0;
          Object.keys(result).forEach((key)=>total+=parseInt(result[key]))
     
        const average = await total/Object.keys(result).length
        console.log(average,total)
         user['average'] = average;
         user['total'] = total
         user['percentile'] =percentile|| average
        await user.save()
        
        res.json(user)
     } catch (error) {
        console.log(error.message)
        res.status(500).json({error:true,message:error.message||"internal error occured"})
     }
    },
    deleteUser:async (req,res)=>{
        try {
        
        const identifier = req.params.id
        console.log(identifier)
        if(!identifier){
             return res.json({error:true,message:"identify a user to be deleted"})
            }
            // if(!mongoose.isValidObjectId(identifier)){
            //     return res.status(400)
            //               .json({error:true,message:"please proide a valid identifier"})
            // }
        const del = await User.findOneAndDelete({id:identifier})
              res.status(200).json({error:false,message:" deleted"})
        } catch (error) {
            console.log(error.message||'some internal error occured')
        }
        

    },
    updateUser: async (req,res)=>{
          
        const {studentId} = req.params
        console.log(studentId)
       
      try {
        const {name,middlename,lastname,result,id,schoolId,schoolname } = req.body;
        //
        const CreatV = joi.object({
            name:joi.string().min(2).max(100),
            middlename:joi.string().min(2).max(100),
            lastname:joi.string().min(2).max(100),
            id:joi.string().min(2).max(100).alphanum(),
            schoolId:joi.string().min(2).max(100).alphanum(),
            schoolname:joi.string().min(2).max(100)
        })
        const {errr,valid} = CreatV.validate({name,middlename,lastname,id,schoolId,schoolname })
        if(errr) return res.status(400).send({
            error:true,message:errr.message||'error'
        })

          //
          let total = 0;
          Object.keys(result).forEach((key)=>total+=result[key])
     
        const average = await total/Object.keys(result).length
          //
          
        
         // newUser.result.keys().reduce(key=>)
        
      
          const {modifiedCount} = await User.updateOne({id:studentId},{name,middlename,lastname,result,id,schoolId,schoolname,total,average,percentile:average},{runValidators:true})
          if(!modifiedCount){
            return res.status(400)
                      .json({error:true,message:'data not complete'})
          }
           res.status(200).json({
            error:false,
            message:'updated'
          })
      } catch (error) {
        res.json({error:true,message:error.message||'update failed'})
      }
    },
    getUser: async (req,res)=>{
        
       
        try {
            const identifier = req.params.id;
            if(!identifier){
                return res.status(400).send({error:true,message:"please provide a searching criteria"})
            }
            // if(!(identifier||mongoose.isValidObjectId(identifier))){
            //    return res.status(404)
            // .json({error:true,message:"invalid identifier"})
            // }
            const target = await User.findOne({id:identifier});
            if(!target){return res.status(404).send({error:true,message:`no student found with id ${identifier}`})}
            res.json(target)
        } catch (error) {
            res.status(500)
            .send({error:true,message:error.message||'server error'})
        }
    },
    getstudentAdmin:async (req,res)=>{
        const identifier = req.params.id
        if(!identifier) return res.status(400).send({
            error:true,
            message:"please use a searching criteria"
        })
        try {
               console.log(identifier)
            const matchs = await User.find({ $text: { $search: 'kibra'} })
            res.status(200).json(matchs)
        } catch (error) {
            res.status(500).json({error:true,message:error.message||"internal error occured"})
        }

    },
    studentContact:async (req,res)=>{ 
        try {
            const {contactEmail,suggestion} = req.body
            const vald = joi.object({
                email:joi.string().min(5).email(),
                sug:joi.string().max(255)
            })
            const {err,values} = vald.validate({email:contactEmail,sug:suggestion})
           if(err){
           return res.status(400).send({error:true,message:"invalid data"})
           }
           const contact = await new Contact({contactEmail,suggestion})
           await contact.save();
           res.status(200).send({success:true,message:"sent"})
        } catch (error) {
            res.status(500).send({error:true,message:error.message||'some internal error'})
        }
      

    },
    imageUpload:async(req,res)=>{
        try {
            const file = req.files.filo
            if(path.extname(file.name)!=".zip") return res.status(400).send({error:true,message:"images in a zip folder"})
            file.mv(path.join(__dirname,'images',file.name),e=>{
        if(e) return res.status(500).send({error:true,message:'internal error occurred'})
        const zz = new z(path.join(__dirname,'images',file.name))
    
        zz.extractAllTo(path.join(__dirname,'images'))
        const d = path.join(__dirname,'images')
          const f = fs.readdir(d,(e,fils)=>{
            fils.forEach(ff=>{
                if(!path.extname(path.join(__dirname,ff))){
                 const sourceDir = path.join(__dirname,"images",ff);
               const destinationDir = path.join(__dirname,"images")

             fsX.move(sourceDir, destinationDir, (err) => {
              if (err) {throw 'problem';}
            //
             else{
                fs.rmdir(sourceDir,err=>{
                    if(err)throw 'problem'
                    else{
                        fs.unlink(path.join(destinationDir,'*.zip'),(e)=>{
                            if(e){throw 'problem';}
                            else{
                                res.status(200).send({})
                            }
                        })
                    }
                })
             }
            //
                
});
                }
            })
          })
        
        })
          
        } catch (error) {
            res.status(500).send({error:true,message:error.message||"something is wrong"})
        }
    },
    importRecored: async (req,res)=>{
        //const fs= require('fs')
        //console.log(JSON.parse(req.files.ff.data)[0].result)
    //    const fff = await fs.createReadStream(req.files.ff.data)
    //    fff.on('data',(d)=>console.log("your data",d))
    //    fff.on('error',(e)=>console.log("error",e.message))
        try {
            console.log('touching',req.files.ff)
            const file = req.files.ff;
            const ext = file.mimetype;
            if(!['application/json','text/csv'].includes(ext)){
                return res.status(201).json({
                    error:true,message:'invalid format'
                })
            }
            switch(ext){
                case 'application/json':
                const data = await JSON.parse(file.data)
                await User.insertMany(data);
                return res.status(200).json({error:false,message:'imported'})
                case 'text/csv':
                    const name = file.name;
                    file.mv(path.join(__dirname,name),(e)=>{
                        if(e){
                            console.log(e.message)
                            return res.status(500).json({
                                error:true,
                                message:'internal error'
                            })
                        }
                       csvtojson().fromFile(path.join(__dirname,name)).then(d=>{
                        //todo:save to database
                        const formatted =  d.map(ob=>{
                          
                            return{
                                id:ob.Id,
                                name:ob.name,
                                middlename:ob.middlename,
                                lastname:ob.lastname,
                                gender:ob.gender=='m'?'male':'female',
                                schoolId:ob.schoolId,
                                schoolname:ob.schoolname,
                                result:{
                                    tigrigna:ob.tigrigna,
                                    amharic:ob.amharic,
                                    english:ob.english,
                                    maths:ob.maths,
                                    physics:ob.physics,
                                    chemistry:ob.chemistry,
                                    biology:ob.biology,
                                    geography:ob.geography,
                                    civic:ob.civic
                                    
                            },
                            total:parseInt(ob.total),
                            average:parseFloat(ob.average),
                            percentile:parseFloat(ob.percentile)
                        }
                        })

                     //console.log(d)
                    User.insertMany(formatted).then(isertz=>{}).catch(e=>res.status(400).send({error:true,message:"check for duplicates in your record file"}))
                     

                  res.send('recivido')}).catch(e=>{
                        return res.status(500).json({
                            error:true,
                            message:'internal error'
                        })
                    })          
                    })
            }
            // const data=  req.files.ff
            // const name = data.name
            // //console.log(data.mimetype)
            // //console.log(name)
            
            // data.mv(path.join(__dirname,name),(e)=>{
            //     if(e){
            //         console.log(e.message)
            //         return res.status(500).json({
            //             error:true,
            //             message:'interna error'
            //         })
            //     }
            //    csvtojson().fromFile(path.join(__dirname,name)).then(d=>{console.log(d)
            // res.send('recivido')}).catch(e=>{
            //     return res.status.json({
            //         error:true,
            //         message:'internal error'
            //     })
            // })          
            // })
           
            //fs.writeFile('ups/s.csv',data,(e)=>{e?console.log('e',e.message):console.log('ha')})
            
            // const file = await JSON.parse(req.files.ff.data)
            
            // await User.insertMany(file)
           
        } catch (error) {
             res.status(500).json({error:true,message:error.message||"internal server error"})
            
        }
    },
    passedStudents:async (req,res)=>{
        try {
            const totalstudents  = await User.find({});
            
            const males = totalstudents.filter(student=>student.gender == "male")
            const females = totalstudents.filter(student=>student.gender == "female")
            const femalesPassed=females.filter(f=>f.total>=50)
            const  malesPassed=males.filter(m=>m.total>=50)
            const totalPassed = femalesPassed.length+malesPassed.length
            const passedList=[]
            const failedList = []
            const totalFailed = totalstudents.length-totalPassed

            // totalstudents.forEach((student)=>{
            //     if(student.result.tigrigna)
            // })
            var passed
            var failed

            ["english","maths","physics","chemistry","biology","geography","civic","tigrigna","amharic",].forEach(subject=>{
            passed = totalstudents.filter(s=>s.result[subject]>=50)
            failed= totalstudents.filter(s=>s.result[subject]<50)

              passedList.push(passed.length)
              failedList.push(failed.length)
              
            })
            res.status(200).json({males:males.length,females:females.length,passedList,failedList,totalPassed,totalFailed,totalStudents:totalstudents.length})
        } catch (error) {
            res.status(500).send({error:true,message:error.message||"internalvvv error happen"})
        }
    },
    getContacts:async (req,res)=>{
        try {
            const contacts = await Contact.find({})
            res.status(200).json(contacts)
        } catch (error) {
            res.status(500).send({error:true,message:'something is wrong'})
        }
    },
    deleteContact:async (req,res)=>{
        try {
            const id = req.params.id
            if(!id) return res.status(400).send({error:true,message:"select an identifier"})
            if(!mongoose.isValidObjectId(id)) return res.status(400).send({error:true,message:"invalid identifier"})
            await Contact.findByIdAndDelete(id);
        res.status(200).json({message:"deleted",id})
        } catch (error) {
            res.status(500).send(error.message||'error occured')
        }
    }
}