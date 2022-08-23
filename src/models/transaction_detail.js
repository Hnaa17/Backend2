const Pool = require('../config/db');

const selectAll = () => {
    return Pool.query(`SELECT * FROM transaction_detail`);
}
const select = (id) => {
    return Pool.query(`SELECT * FROM transaction_detail WHERE id=${id}`);
}

const getProduct = (id) => {
    return Pool.query(`SELECT * FROM products WHERE id=${id}`);
}

const insert = (transaction_id, product_id, quantity) => {
    return Pool.query(`INSERT INTO transaction_detail (transaction_id, product_id, quantity) VALUES (${transaction_id}, ${product_id}, ${quantity})`);
}
const update = (id, transaction_id, product_id, quantity) => {
    return Pool.query(`UPDATE transaction_detail SET transaction_id=${transaction_id}, product_id=${product_id}, quantity=${quantity} WHERE id=${id}`);
}

const updateStock = (id, quantity) => {
    return Pool.query(`UPDATE products SET stock = stock - ${quantity} WHERE id=${id}`);
}

const deleteDetail = (id) => {
    return Pool.query(`DELETE FROM transactions WHERE id=${id}`);
}

module.exports = {
    selectAll,
    select,
    insert,
    update,
    deleteDetail,
    getProduct,
    updateStock
}