const express = require('express');
const app = express();
let port = 3000;

app.post('/getUser', (req, res) => {
    res.status(200).send('HEllo');
});

app.get('/getUser', (req, res) => {
    res.status(200).send('HEllo');
});

app.listen(port, () => {
    console.log(`Hello from port: ${port}`);
});