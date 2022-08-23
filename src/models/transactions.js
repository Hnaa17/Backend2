const Pool = require('../config/db');

const selectAll = () => {
    return Pool.query(`SELECT * FROM transactions`);
}
const select = (id) => {
    return Pool.query(`SELECT * FROM transactions WHERE id=${id}`);
}
const insert = (transaction_date, customer) => {
    return Pool.query(`INSERT INTO transactions (transaction_date, customer) VALUES ('${transaction_date}', '${customer}')`);
}
const update = (id, transaction_date, customer) => {
    return Pool.query(`UPDATE transactions SET transaction_date='${transaction_date}', customer='${customer}' WHERE id=${id}`);
}
const deleteTransactions = (id) => {
    return Pool.query(`DELETE FROM transactions WHERE id=${id}`);
}

module.exports = {
    selectAll,
    select,
    insert,
    update,
    deleteTransactions
}