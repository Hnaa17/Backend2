const client = require('../config/redis')
const  {response} = require('../helper/common')

const hitCacheProductDetail = async(req,res,next)=>{
    const id = req.params.id
    const categories = await client.get(`categories/${id}`)
    if(categories){
        return response(res, JSON.parse(categories) ,200,'get data success from redis')
    }
    next()
}

const clearCacheProductDetail = (req,res,next) =>{
    const id = req.params.id
    client.del(`categories/${id}`)
    next()
}

module.exports = {hitCacheProductDetail,clearCacheProductDetail}