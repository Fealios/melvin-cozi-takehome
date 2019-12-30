const express = require("express");
const bodyParser = require('body-parser');

const inquiries = require('./inquiries');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post('/', (req, res) => {
    if (!req.body) {
        res.send({error: 'Please include a body in your request'});
    } else {
        const inquiry = req.body;
        res.send(inquiries.addInquiry(inquiry));
    }
})

app.listen(3000, () => {
    console.log('The server is up and listening on port 3000')
});