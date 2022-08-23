const Pool = require('../config/db');

const selectAll = ({limit, offset, sortby, sort}) => {
    return Pool.query(`SELECT * FROM products ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
}
const searching = (search) => {
    return Pool.query(`SELECT * FROM products ILIKE $1`, [`%${search}%`]);
}
const select = (id) => {
    return Pool.query(`SELECT * FROM products WHERE products.id=${id}`);
}
const insert = (product_name, category_id, size, color, price, stock, photo, descript, seller_id, product_rating, product_condition) => {
    return Pool.query(`INSERT INTO products (product_name, category_id, size, color, price, stock, photo, descript, seller_id, product_rating, product_condition) VALUES ('${product_name}', ${category_id}, '${size}', '${color}', ${price}, ${stock}, '${photo}', '${descript}', ${seller_id}, ${product_rating}, '${product_condition}')`);
}
const update = (id, product_name, category_id, size, color, price, stock, photo, descript, seller_id, product_rating, product_condition) => {
    return Pool.query(`UPDATE products SET product_name='${product_name}', category_id=${category_id}, size='${size}', color='${color}', price=${price}, stock=${stock}, photo='${photo}', descript='${descript}', seller_id=${seller_id}, product_rating=${product_rating}, product_condition='${product_condition}' WHERE id=${id}`);
}
const deleteProducts = (id) => {
    return Pool.query(`DELETE FROM products WHERE id=${id}`);
}
const countProducts = () => {
    return Pool.query('SELECT COUNT(*) FROM products')
}
const findId = (id) =>{
    return  new Promise ((resolve,reject)=> 
    Pool.query(`SELECT id FROM products WHERE id=${id}`,(error,result)=>{
      if(!error){
        resolve(result)
      }else{
        reject(error)
      }
    })
    )
  }


module.exports = {
    selectAll,
    select,
    insert,
    update,
    deleteProducts,
    countProducts,
    searching,
    findId
}