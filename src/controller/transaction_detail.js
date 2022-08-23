const detailModel = require('../models/transaction_detail')
const detailController = {
    getAllDetail: (req, res) => {
        detailModel.selectAll()
        .then(
            result => res.json(result.rows)
        )
        .catch(err => res.send(err)
        )
    },
    getDetail: (req, res) => {
        const id = Number(req.params.id)
        detailModel.select(id)
        .then(
            result => res.json(result.rows)
        )
        .catch(err => res.send(err)
        )
    },
    insert: (req, res) => {
        const {transaction_id, product_id, quantity} = req.body;
        detailModel.updateStock(product_id, quantity)
        detailModel.insert(transaction_id, product_id, quantity)
        .then(            
            res.json('Transaction detail done')
        )
        .catch(err => res.send(err)
        )
    },
    updateDetail: (req, res) => {
        const id = Number(req.params.id)
        const{transaction_id, product_id, quantity} = req.body;
        detailModel.updateStock(product_id, quantity);
        detailModel.update(id, transaction_id, product_id, quantity)
        .then(
            res.json('Detail updated')
        )
        .catch(err => res.send(err)
        )
    },
    delete: (req, res) => {
        const id = Number(req.params.id)
        detailModel.deleteDetail(id)
        .then(
            res.json('Transaction detail deleted')
        )
        .catch(err => res.send(err)
        )
    }
}

module.exports = detailController