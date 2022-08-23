const {selectAll,select,insert,update,deleteProducts,countProducts,searching,findId} = require('../models/products')
const createError = require('http-errors');
const commonHelper = require('../helper/common');
const client = require('../config/redis');

const productsController = {
    getAllProducts: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 5;
            const offset = (page - 1) * limit;
            const sortby = req.query.sortby || ('product_name') || ('price');
            const sort = req.query.sort || 'ASC' || 'DESC';
            console.log(sort);
            const result = await selectAll({limit, offset, sortby, sort});
            const {rows:[count]} = await countProducts();
            const totalData = parseInt(count.count);
            const totalPage = Math.ceil(totalData / limit);
            const pagination = {
                page: page,
                limit: limit,
                totalData: totalData,
                totalPage: totalPage
                }
            commonHelper.response(res, result.rows, 200, "Get data success", pagination)
        } catch (error) {
            res.send(createError(404));
        }
    },
    search: (req, res) => {
        const search = req.query.search ||"";
        searching(search)
        .then(result => res.json(result.rows))
        .catch(err => res.send(err));
    },
    getProducts: (req, res) => {
        const id = Number(req.params.id);
        select(id)
          .then(
            result => {
            client.setEx(`products/${id}`,60*60,JSON.stringify(result.rows))
            commonHelper.response(res, result.rows, 200, "get data success from database")
            }
          )
          .catch(err => res.send(err)
          )
    },
    insertProducts: async (req, res) => {
        const PORT = process.env.DB_PORT || 8000
        const DB_HOST = process.env.DB_HOST || 'localhost'
        const photo = req.file.fieldname;
        const {product_name, category_id, size, color, price, stock, descript, seller_id, product_rating, product_condition} = req.body;
        const {rows: [count]} = await countProducts()
        const id = Number(count.count)+1;
    
        const data ={
          id,
          product_name, 
          category_id, 
          size, 
          color, 
          price, 
          stock, 
          photo:`http://${DB_HOST}:${PORT}/img/${photo}`, 
          descript, 
          seller_id, 
          product_rating, 
          product_condition
        }
        insert(data)
          .then(
            result => commonHelper.response(res, result.rows, 201, "Product created")
          )
          .catch(err => res.send(err)
          )
    },
    updateProduct: async (req, res) => {
        try{
            const PORT = process.env.DB_PORT || 8000
            const DB_HOST = process.env.DB_HOST || 'localhost'
            const id = Number(req.params.id)
            const photo = req.file.fieldname;
            const {product_name, category_id, size, color, price, stock, descript, seller_id, product_rating, product_condition} = req.body
            const {rowCount} = await findId(id)
            if(!rowCount){
              return next(createError(403,"ID is Not Found"))
            }
            const data ={
              id,
              product_name, 
              category_id, 
              size, 
              color, 
              price, 
              stock, 
              photo:`http://${DB_HOST}:${PORT}/img/${photo}`, 
              descript, 
              seller_id, 
              product_rating, 
              product_condition
            }
            update(data)
              .then(
                result => commonHelper.response(res, result.rows, 200, "Product updated")
                )
                .catch(err => res.send(err)
                )
              }catch(error){
                console.log(error);
              }
    },
    deleteProduct: async (req, res, next) => {
        try{
            const id = Number(req.params.id)
            const {rowCount} = await findId(id)
            if(!rowCount){
              return next(createError(403,"ID is Not Found"))
            }
            deleteProducts(id)
              .then(
                result => commonHelper.response(res, result.rows, 200, "Product deleted")
              )
              .catch(err => res.send(err)
              )
          }catch(error){
              console.log(error);
          }
    }
}

module.exports = productsController