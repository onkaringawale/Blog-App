const expess = require('express')
const mongoose = require('mongoose')
const cors= require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParse = require('cookie-parser')
const multer = require('multer')
const path = require('path')
const UserModel = require('./Model/User')
const PostModel = require('./Model/PostModel')
const { resourceLimits } = require('worker_threads')
const { post } = require('jquery')


const app = expess()
app.use(expess.json())
app.use(cors({
    origin:['http://localhost:5173'],
    methods:['GET','POST','PUT','DELETE'],
    credentials:true
}))
app.use(cookieParse())
app.use(expess.static('public'))

mongoose.connect('mongodb://127.0.0.1:27017/blog')

const verifyUser = (req,res,next)=>{
    const token = req.cookies.token;

    if (!token){
        return res.json('token is missing')
    }
    else{
        jwt.verify(token,'jwt-secret-key',(err,decoded)=>{
            if(err){
                return res.json("token was wrong")
            }
            else{
                req.email = decoded.email;
                req.username = decoded.username;
                next()
            }
        })
    }
}

app.get('/',verifyUser,(req,res)=>{
    return res.json({email : req.email, username : req.username})
})

app.post('/register',(req,res)=>{
    console.log(req.body)
    const {username,email,password} = req.body;
        bcrypt.hash(password, 10)
        .then(hash=>{
            UserModel.create({ username,email,password:hash})
            .then(user => res.json(user))
            .catch(err => res.json(err))
        })
        .catch(err=>console.log(err))
        
})

app.post('/login',(req,res)=>{
    const {email,password} = req.body;
    UserModel.findOne({email : email})
    .then(user=>{
        if(user){
            bcrypt.compare(password, user.password,(err,responce)=>{
                if(responce){
                    const token = jwt.sign({email:user.email, username: user.username},'jwt-secret-key',{expiresIn:'1d'})
                    console.log(token)
                    res.cookie('token',token)
                    return res.json('Success')
                }
                else{
                    return res.json('password is incorrect')
                }
            })
        }
        else{
            res.json('user not exit')
            
        }
    })
})

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/Images')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'_'+Date.now()+path.extname(file.originalname))
    }

})

const Upload = multer({
    storage:storage
})

app.post('/create',verifyUser,Upload.single('file'),(req,resp)=>{
   PostModel.create({
    title:req.body.title,
    desc:req.body.desc,
    file:req.file.filename,
    email: req.body.email
   }).then(res=> resp.json("Success"))
   .catch(err => console.log(err))

})

app.get('/logout',(req,res)=>{
    res.clearCookie('token');
    return res.json('Success')
})

app.get('/getRecords',(req,res)=>{
    PostModel.find()
    .then(post => res.json(post))
    .catch(err => console.log(err))
})

app.get('/getpostbyid/:id',(req,res)=>{
    const id = req.params.id
    PostModel.findById({_id : id})
    .then(post => res.json(post))
    .catch(err =>console.log(err) )
})

app.put('/editPost/:id',(req,res)=>{
    const id = req.params.id
    PostModel.findByIdAndUpdate({
        _id : id},{ title: req.body.title,desc:req.body.desc
    }).then((result)=>res.json("Success"))
    .catch((err)=>console.log(err))
})
app.delete('/deletePost/:id',(req,res)=>{
    const id = req.params.id;
    PostModel.findByIdAndDelete({_id:id})
    .then(result=> res.json(result))
    .catch(err => console.log(err))
})
app.listen(3001,()=>{   
    console.log('server is running')
})
