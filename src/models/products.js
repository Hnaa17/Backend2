const Pool = require('../config/db');

const searchKeywordsProduct = (keywords) => {
    return Pool.query(`SELECT products.id, products.product_name, seller.store_name, products.price, products.size, products.stock, products.photo, categories.category_name, products.product_condition, products.descript
    FROM products 
    INNER JOIN categories 
    ON products.category_id = categories.id
    INNER JOIN seller 
    ON products.seller_id = seller.id WHERE products.id || ' ' || products_name ILIKE $1`, [
        `%${keywords}%`,
    ]);
};

const selectAll = ({limit, offset, sort, sortby, querySearch}) => {
    return Pool.query(`SELECT products.id, products.product_name, seller.store_name, products.price, products.size, products.stock, products.photo, categories.category_name, products.product_condition, products.descript
    FROM products 
    INNER JOIN categories 
    ON products.category_id = categories.id
    INNER JOIN seller 
    ON products.seller_id = seller.id ${querySearch} ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
}

const selectPaginationTotal = ({ querysearch }) => {
    return Pool.query(`select * from products ${querysearch}`)
}

const select = (id) => {
    return Pool.query(`SELECT products.product_name, seller.store_name, products.price, products.size, products.stock, products.photo, categories.category_name, products.product_condition, products.descript
    FROM products 
    INNER JOIN categories 
    ON products.category_id = categories.id
    INNER JOIN seller 
    ON products.seller_id = seller.id WHERE products.id=${id}`);
}
const insert = (product_name, seller_id, price, size, stock, photo, category_id, product_condition, descript) => {
    return Pool.query(`INSERT INTO products (product_name, seller_id, price, size, stock, photo, category_id, product_condition, descript) VALUES ('${product_name}', ${seller_id}, ${price}, '${size}', ${stock}, '${photo}', ${category_id}, '${product_condition}', '${descript}')`);
}

const update = (id, product_name, seller_id, price, size, stock, photo, category_id, product_condition, descript) => {
    return Pool.query(`UPDATE products SET product_name='${product_name}', seller_id=${seller_id}, price=${price}, size='${size}', stock=${stock}, photo='${photo}', category_id=${category_id}, product_condition='${product_condition}', descript='${descript}' WHERE id=${id}`);
}

const deleteProducts = (id) => {
    return Pool.query(`DELETE FROM products WHERE id=${id}`);
}

const countProducts = () => {
    return Pool.query('SELECT COUNT(*) FROM products')
}

const findId = (id) =>{
    return  new Promise((resolve, reject) => {
        Pool.query(`SELECT id FROM products WHERE id=${id}`,(error,result) => {
            if(!error){
                resolve(result)
            }else{
                reject(error)
            }
        })
    })
}


module.exports = {
    searchKeywordsProduct,
    selectAll,
    selectPaginationTotal,
    select,
    insert,
    update,
    deleteProducts,
    countProducts,
    findId
}