const sellerModel = require('../models/seller')
const createError = require('http-errors');
const commonHelper = require('../helper/common');

const sellerController = {
    getAllSeller: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 5;
            const offset = (page - 1) * limit;
            const result = await sellerModel.selectAll({limit, offset});
            const {rows:[count]} = await sellerModel.countSeller();
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
    search: async (req, res) => {
        const search = req.query.search ||"";
        sellerModel.searching(search)
        .then(result => res.json(result.rows))
        .catch(err => res.send(err));
        // try {
        //     const page = parseInt(req.query.page) || 1;
        //     const limit = parseInt(req.query.limit) || 10;
        //     const offset = (page - 1) * limit;
        //     const search = req.query.search ||"";
        //     const result = await sellerModel.searching({limit, offset, search});
        //     const {rows:[count]} = await sellerModel.countSeller();
        //     const totalData = parseInt(count.count);
        //     const totalPage = Math.ceil(totalData / limit);
        //     res.status(200).json({
        //      pagination: {
        //         page: page,
        //         limit: limit,
        //         totalData: totalData,
        //         totalPage: totalPage
        //         },
        //         data: result.rows
        //     })
        // } catch (error) {
        //     res.send(createError(404));
        // }
    },
    getSeller: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const result = await sellerModel.select(id);
            res.status(200).json(result.rows);
        } catch (error) {
          res.send(createError(404));
        }
        // const id = Number(req.params.id);
        // sellerModel.select(id)
        // .then(result => res.json(result.rows))
        // .catch(err => res.send(err));
    },
    insertSeller: async (req, res) => {
        try {
            const {username, password, store_name, email, phone, address_seller} = req.body;
            await sellerModel.insert(username, password, store_name, email, phone, address_seller)
            res.status(201).json({message: "New Seller created"});
        } catch (error) {
            res.send(createError(400));
        }
    },
    updateSeller: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const {username, password, store_name, email, phone, address_seller} = req.body;
            await sellerModel.update(id, username, password, store_name, email, phone, address_seller)
            res.status(201).json({message: "Seller updated"});
        } catch (error) {
            res.send(createError(400))
        }
    },
    deleteSeller: async (req, res) => {
        try {
            const id = Number(req.params.id);
            await sellerModel.deleteSeller(id);
            res.status(200).json({message: "Seller deleted"});
        } catch (error) {
            res.send(createError(400));
        }
    }
}

module.exports = sellerController