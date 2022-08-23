const Pool = require('../config/db');

const selectAll = ({limit, offset, sortby, sort}) => {
    return Pool.query(`SELECT * FROM categories ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
}
const searching = (search) =>{
    return Pool.query("SELECT * FROM categories WHERE category_name ILIKE $1", [`%${search}%`]);
};
const selectCategories = (id) => {
    return Pool.query(`SELECT * FROM categories WHERE id=${id}`);
}
const insert = (category_name) => {
    return Pool.query(`INSERT INTO categories (category_name) VALUES ('${category_name}')`);
}
const update = (id, category_name) => {
    return Pool.query(`UPDATE categories SET category_name='${category_name}' WHERE id=${id}`);
}
const deleteCategories = (id) => {
    return Pool.query(`DELETE FROM categories WHERE id=${id}`);
}
const countCategories = () => {
    return Pool.query('SELECT COUNT(*) FROM categories')
}

module.exports = {
    selectAll,
    searching,
    selectCategories,
    insert,
    update,
    deleteCategories,
    countCategories
}