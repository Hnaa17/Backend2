const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcryptjs')
const createError = require('http-errors')
const jwt = require('jsonwebtoken')
const {findEmail,create} = require('../models/users')
const commonHelper = require('../helper/common')
const authHelper = require('../helper/auth')

const userController = {
    register: async(req,res,next)=>{
        try{
          const {email,password,fullname} = req.body;
          const {rowCount} = await findEmail(email)
          const passwordHash = bcrypt.hashSync(password);
          const id = uuidv4()
          if(rowCount){
            return next(new createError(403,'Email is already used')) 
          } 
          const data = {
            id, 
            email,
            password:passwordHash,
            fullname,
            role: 'users'
          }
          create(data)
            .then(
              result => commonHelper.response(res, result.rows, 201, "Registrasi successfull")
            )
            .catch(err => res.send(err))
        }catch(error) {
            console.log(error); 
        }
    },
    login : async(req,res, next) => {
        try{
            const {email,password} = req.body
            const {rows:[users]} = await findEmail(email)
            if(!users){
              return commonHelper.response(res,null,403,'Email is invalid')
            }
            const isValidPassword = bcrypt.compareSync(password, users.password)  
        
            if(!isValidPassword){
              return commonHelper.response(res,null,403,'Password is invalid')
            }
            delete users.password
            const payload = {
              email: users.email, 
              role : users.role
            }

            users.token = authHelper.generateToken(payload) 
            users.refreshToken = authHelper.generateRefreshToken(payload) 
    
            commonHelper.response(res,users,201,'login is successful')
        }catch(error){
          console.log(error);
        }
      },
      profile : async(req,res,next)=>{
        const email = req.payload.email 
        const {rows:[users]} = await findEmail(email) 
        delete users.password
        commonHelper.response(res,users,200,'get profile success')
      },
      refreshToken : (req,res)=>{  
        const refreshToken = req.body.refreshToken
        const decoded = jwt.verify(refreshToken, process.env.SECRETE_KEY_JWT)
        const payload ={
          email : decoded.email,
          role : decoded.role
        }
        const result ={
          token : authHelper.generateToken(payload),
          refreshToken : authHelper.generateRefreshToken(payload)
        }
        commonHelper.response(res,result,200)
    }
}

module.exports = userController