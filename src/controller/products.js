const {searchKeywordsProduct, selectAll, selectPaginationTotal, select, insert, update, deleteProducts, countProducts, findId} = require('../models/products')
const createError = require('http-errors');
const commonHelper = require('../helper/common');
const { success, failed } = require('../helper/response')
const { v4: uuidv4 } = require('uuid');
// const client = require('../config/redis');

const productsController = {
    searchProduct: async(req, res) => {
      try{
        const keywords = "" || req.query.keyword;
        const result = await searchKeywordsProduct(keywords);
        success(res, {
          code: 200,
          status: 'success',
          message: `Success get product`,
          data: result.rows,
        });
      }catch (error) {
        failed(res, {
          code: 404,
          status: 'error',
          message: `product with that keywords is not found`,
          error: [],
        });
      }
    },

    getAllProducts: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1 ;
            const limit = parseInt(req.query.limit) || 10 ;
            const offset = (page - 1) * limit;

            const search = req.query.search  || '';
            let querySearch = '';
            if (search === undefined) {
              querySearch = ``;
            } else {
              querySearch = `where product_name ilike '%${search}%' `;
            }

            const sortby = req.query.sortby || 'product_name';
            const sort = req.query.sort || 'ASC';
            // console.log(sort);

            const result = await selectAll({limit, offset, sort, sortby, querySearch});
            const resultTotal = await selectPaginationTotal({querySearch});
            const totalData = parseInt(resultTotal.rowCount);
            // const {rows:[count]} = await countProducts();
            // const totalData = parseInt(count.count);
            const totalPage = Math.ceil(totalData / limit);
            const pagination = {
                page: page,
                limit: limit,
                totalData: totalData,
                totalPage: totalPage
                }
                success(res, {
                  code: 200,
                  status: 'success',
                  message: 'Success get all products',
                  data: result.rows,
                  pagination: pagination
                });
        } catch (error) {
            console.log(error);
        }
    },
    getProducts: async (req, res) => {
      try {
        const { id } = req.params;
        const result = await select(id);
        if (result.rowCount > 0) {
          success(res, {
            code: 200,
            status: 'success',
            message: 'Success get users by id',
            data: result.rows[0],
          });
        } else {
          failed(res, {
            code: 404,
            status: 'error',
            message: `product with id ${id} is not found`,
            error: [],
          });
        }
      } catch (error) {
        failed(res, {
          code: 500,
          status: 'error',
          message: error.message,
          error: [],
        });
      }
    },
    
    insertProducts: async (req, res) => {
      try {
        const {product_name, seller_id, price, size, stock, category_id, product_condition, descript} = req.body;
        // const id = uuidv4().toLocaleLowerCase();
        const photo = req.file.filename;

        await insert(product_name, seller_id, price, size, stock, photo, category_id, product_condition, descript)

        success(res, {
          code: 200,
          status: 'success',
          message: 'new product has been created',
        });

      } catch (error) {
        failed(res, {
          code: 500,
          status: 'error',
          message: error,
          error: [],
        });
      }
    },

    updateProduct: async (req, res, next) => {
      const { id } = req.params;
      // const {product_name, seller_id, price, size, stock, category_id, product_condition, descript} = req.body;
      const {product_name, price, size, stock, product_condition, descript} = req.body;
      // const photo = req.file.filename;
      const {rowCount} = await findId(id)
      if(!rowCount){
        return next(createError(403,"ID is Not Found"))
      }
      await update(
        id,
        product_name, 
        price,  
        size, 
        stock, 
        product_condition, 
        descript
      )
      .then(
        result => commonHelper.response(res, result.rows, 200, "Product updated")
      )
      .catch(err => res.send(err)
      )
    },

    deleteProduct: async (req, res) => {
        try{
            const { id } = req.params;
            const detailProduct = await select(id);
            if (detailProduct.rowCount > 0) {
              await deleteProducts(id);
              success(res, {
                code: 200,
                status: 'success',
                message: `success deleted product with id ${id}`,
                error: [],
              });
              return;
            } else {
              failed(res, {
                code: 404,
                status: 'error',
                message: `product with id ${id} is not found`,
                error: [],
              });
              return;
            }
          }catch(error){
            failed(res, {
              code: 500,
              status: 'error',
              message: error.message,
              error: [],
            });
          }
    }
}

module.exports = productsController