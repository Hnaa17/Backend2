const categoriesModel = require('../models/categories');
const createError = require('http-errors');
const commonHelper = require('../helper/common');
const client = require('../config/redis');

const categoriesController = {
    getAllCategories: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 5;
            const offset = (page - 1) * limit;
            const sortby = req.query.sortby || ('category_name');
            const sort = req.query.sort || 'ASC' || 'DESC';
            console.log(sort);
            const result = await categoriesModel.selectAll({limit, offset, sortby, sort});
            const {rows:[count]} = await categoriesModel.countCategories();
            const totalData = parseInt(count.count);
            const totalPage = Math.ceil(totalData/limit);
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
        categoriesModel.searching(search)
        .then(result => res.json(result.rows))
        .catch(err => res.send(err));
    },
    getCategories: async (req, res) => {
        const id = Number(req.params.id);
        categoriesModel.selectCategories(id)
          .then(
            result => {
            client.setEx(`categories/${id}`,60*60,JSON.stringify(result.rows))
            commonHelper.response(res, result.rows, 200, "get data success from database")
            }
          )
          .catch(err => res.send(err)
          )
    },
    insertCategories: async (req, res) => {
        try {
            const {category_name} = req.body;
            await categoriesModel.insert(category_name);
            res.status(201).json({message: "New Category Created"});
        } catch (error) {
            res.send(createError(400));
        }
    },
    updateCategories: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const {category_name} = req.body;
            await categoriesModel.update(id, category_name);
            res.status(201).json({message: "Category Updated"});
        } catch (error) {
            res.send(createError(400))
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const id = Number(req.params.id);
            await categoriesModel.deleteCategories(id);
            res.status(200).json({message: "Category deleted"});
        } catch (error) {
            res.send(createError(404));
        }
    }
}

module.exports = categoriesController