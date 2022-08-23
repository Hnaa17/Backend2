const Pool = require('../config/db');

const selectAll = ({limit, offset}) => {
    return Pool.query(`select * from seller LIMIT ${limit} OFFSET ${offset}`);
}
const searching = (search) => {
    return Pool.query("select * from seller WHERE store_name ILIKE $1", [`%${search}%`]);
}
const select = (id) => {
    return Pool.query(`select * from seller WHERE id=${id}`);
}
const insert = (username, password, store_name, email, phone, address_seller) => {
    return Pool.query(`INSERT INTO seller (username, password, store_name, email, phone, address_seller) VALUES ('${username}', '${password}', '${store_name}', '${email}', '${phone}', '${address_seller}')`);
}
const update = (id, username, password, store_name, email, phone, address_seller) => {
    return Pool.query(`UPDATE seller SET username='${username}', password='${password}', store_name='${store_name}', email='${email}', phone='${phone}', address_seller='${address_seller}' WHERE id=${id}`);
}
const deleteSeller = (id) => {
    return Pool.query(`DELETE FROM seller WHERE id=${id}`);
}
const countSeller = () => {
    return Pool.query('SELECT COUNT(*) FROM seller')
}


module.exports = {
    selectAll,
    select,
    insert,
    update,
    deleteSeller,
    countSeller,
    searching
}