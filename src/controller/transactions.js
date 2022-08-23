const transactionsModel = require('../models/transactions')
const transactionsController = {
    getAllTransactions: (req, res) => {
        transactionsModel.selectAll()
        .then(
            result => res.json(result.rows)
        )
        .catch(err => res.send(err)
        )
    },
    getTransactions: (req, res) => {
        const id = Number(req.params.id)
        transactionsModel.select(id)
        .then(
            result => res.json(result.rows)
        )
        .catch(err => res.send(err)
        )
    },
    insert: (req, res) => {
        const {transaction_date, customer} = req.body;
        transactionsModel.insert(transaction_date, customer)
        .then(
            res.json('Transaction success')
        )
        .catch(err => res.send(err)
        )
    },
    updateTransactions: (req, res) => {
        const id = Number(req.params.id)
        const{transaction_date, customer} = req.body;
        transactionsModel.update(id, transaction_date, customer)
        .then(
            res.json('Transaction updated')
        )
        .catch(err => res.send(err)
        )
    },
    delete: (req, res) => {
        const id = Number(req.params.id)
        transactionsModel.deleteTransactions(id)
        .then(
            res.json('Transaction deleted')
        )
        .catch(err => res.send(err)
        )
    }
}

module.exports = transactionsController