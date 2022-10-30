CREATE DATABASE database2;

CREATE TABLE seller (
    id serial primary key,
    username varchar not null,
    password varchar not null,
    store_name varchar not null,
    email varchar not null,
    phone varchar,
    address_seller text
);
id, username, password, store_name, email, phone, address_seller

{
    "username": "yanah76",
    "password": "yanah123",
    "store_name": "yanahStore",
    "email": "yanah@gmail.com",
    "phone": "081234565432",
    "address_seller": "bogor"
}

CREATE TABLE categories (
    id serial primary key,
    category_name varchar not null
);
    category_photo varchar not null

{
    "categoryProductName": "Seragam SD"
}

CREATE TABLE products (
    id serial primary key,
    product_name varchar not null,
    seller_id int not null,
    price decimal not null,
    size varchar not null ,
    stock int not null,
    photo VARCHAR,
    category_id int not null,
    product_condition varchar not null,
    descript text not null
);
    product_rating int not null,
    

insert into products(product_name, seller_id, price, size, stock, photo, category_id, product_condition, descript) values ('jaket kulit', 2, 150000, 'L', 15, 'jaket.jpg', 3, 'new', 'jaket kulit dengan kualitas internasional');

product_name, category_id, size, color, price, stock, descript, seller_id, product_rating, product_condition
    -- check (sizeProduct in ('S','M','L','XL','XXL','XXXL')),
    -- constraint categories foreign key(categoryID) 
    --     references categories(categoryID) on delete cascade,
    -- constraint seller foreign key(sellerID)
    --     references seller(sellerID) on delete cascade,
    -- primary key (productID)
-- );



sellerID, usernameSeller, passwordSeller, storeName, emailSeller, phoneSeller, addressSeller

-- {
--     "product_name": "levis", 
--     "category_id": 4, 
--     "size": "L", 
--     "color": "biru", 
--     "price": 55000, 
--     "stock": 12, 
--     "descript": "levis terbuat dari bahan 100% asli", 
--     "seller_id": 1, 
--     "product_rating": 9, 
--     "product_condition": "new"
-- }

create table users(
    id VARCHAR primary key, 
    email varchar not null, 
    password varchar not null, 
    fullname varchar not null,
    phone text,
    role VARCHAR
);

INSERT INTO users(id,email,password,fullname, username) VALUES (${id}, '${email}', '${password}', '${fullname}', '${username}')
insert into users(id,email,passwordUser,fullname,username,role) values ('1','hana@gmail.com', 'hana17', 'Farhana Achmad', 'hana', 'user');
{
    "email": "yanah@yahoo.com",
    "password": "maryan76",
    "fullname": "mardiana",
    "username": "lili",
    "role": "user"
}

SELECT * FROM users WHERE email='yanah@yahoo.com';

CREATE TABLE transactions (
    id VARCHAR primary key,
    trs_number varchar not null,
    product_id int not null,
    qty int not null
);
    transaction_date DATE NOT NULL,
    customer VARCHAR NOT NULL

-- CREATE TABLE transaction_detail(
--     id SERIAL PRIMARY KEY,
--     transaction_id INT NOT NULL,
--     product_id INT NOT NULL,
--     quantity INT NOT NULL
-- );

CREATE TABLE cart(
    id serial primary key,
    product_id varchar not null,
    qty int not null,
    session_id varchar not null
)

DROP TABLE products CASCADE;

SELECT * FROM products;

SELECT * FROM products WHERE id=3;


SELECT * FROM categories;

SELECT * FROM categories WHERE id=3;

SELECT products.product_name, categories.category_name, products.size, products.color, products.price, products.stock, products.descript, seller.store_name, products.product_rating, products.product_condition
FROM products 
INNER JOIN categories 
ON products.category_id = categories.id
INNER JOIN seller 
ON products.seller_id = seller.id

INSERT INTO categories(id,category_name) VALUES (18, 'pants')

INSERT INTO categories(category_name) VALUES ('pants');

UPDATE categories SET category_name='shoes' WHERE id=3;

DELETE FROM categories WHERE id=5;