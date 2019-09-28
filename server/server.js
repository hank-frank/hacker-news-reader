const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.static('dist'));

// app.get('/api', (req, res) => {
//     axios.get(`https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty`)
//         .then((result) => {
//             res.send(result.data);
//             console.log(`result `, result)
//         })
//         .catch((error) => {
//             console.error(error);
//             res.send('An error occured.');
//         })
// });

module.exports = app;
