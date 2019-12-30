const fs = require("fs");
const express = require("express");
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post('/', (req, res) => {
    if (!req.body) {
        res.send({error: 'Please include a body in your request'});
    } else {
        const inquiry = req.body;
        res.send(addInquiry(inquiry));
    }
})

const addInquiry = (inquiry) => {
    const inquiryArr = loadInquiries();
    console.log(inquiryArr);
    inquiryArr.push(inquiry);

    saveInqueries(inquiryArr);
}

const saveInqueries = (inquiryArr) => {
    const inquiryJSON = JSON.stringify(inquiryArr);

    try {
        fs.writeFileSync(__dirname + '/../misc/inquiries.json', inquiryJSON);
        return 'Success';
    } catch (error) {
        console.log(error);
        return error;
    }
}

const loadInquiries = () => {
    try {
        const inquirysJSON = fs.readFileSync(__dirname + '/../misc/inquiries.json').toString();
        return JSON.parse(inquirysJSON);
    } catch (error) {
        return [];
    }
}

app.listen(3000, () => {
    console.log('The server is up and listening on port 3000')
});