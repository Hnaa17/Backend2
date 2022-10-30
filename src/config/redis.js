const { createClient } = require('redis');

const client = redis.createClient({
    url: 'redis://redis:6379'
});

client.connect();

client.on('connect', (err) => {
    if(err) throw err;
    else console.log('Redis Connected..!');
});

client.on('error', (err) => console.log('Redis Client Error', err));

client.connect();

module.exports = client