const Pool = require('../config/db')

const findEmail = (email) => {
  return  new Promise ((resolve,reject) => 
    Pool.query(`SELECT * FROM users WHERE email='${email}'`, (error,result) => {
      if(!error){
        resolve(result)
      }else{
        reject(error)
      }
    })
  )
}

const findFullname = (fullname) => {
  return Pool.query(`select * from users where fullname='${fullname}'`);
}

const create = (data) => {
  const {id, email, password, fullname, phone, role} = data
  return new Promise ((resolve,reject) => 
    Pool.query(`INSERT INTO users(id, email, password, fullname, phone, role) VALUES('${id}','${email}','${password}','${fullname}','${phone}','${role}')`,(error,result) => {
      if(!error){
        resolve(result)
      }else{
        reject(error)
      }
    })
  )
}

const update = (data) => {
  const {id, email, password, fullname, phone, role} = data 
  return new Promise ((resolve, reject) =>
  Pool.query(`UPDATE users SET email='${email}', password='${password}', fullname='${fullname}', phone='${phone}', role='${role}' WHERE id='${id}'`, (error, result) => {
    if(!error){
      resolve(result)
    }else{
      reject(error)
    }
  }))
}

const deleteAccount = (email) => {
  return Pool.query(`delete from users where email='${email}'`)
}
    
module.exports = {
  findEmail,
  findFullname,
  create,
  update,
  deleteAccount
}