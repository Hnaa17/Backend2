// const client = require('../config/redis')
// const  { response } = require('../helper/common')

// const hitCacheProductDetail = async (req,res,next) => {
//     const id = req.params.id
//     const products = await client.get(`products/${id}`)
//     if(products){
//         return response(res, JSON.parse(products), 200,'get data success from redis')
//     }
//     next()
// }

// const clearCacheProductDetail = (req,res,next) => {
//     const id = req.params.id
//     client.del(`products/${id}`)
//     next()
// }

// module.exports = {hitCacheProductDetail,clearCacheProductDetail}