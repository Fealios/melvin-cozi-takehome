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
        const interest = req.body;
        return saveInterest(interest);
    }
})

const saveInterest = (interest) => {
    const interestJSON = JSON.stringify(interest);
    try {
        fs.writeFileSync(__dirname + '/../misc/interests.json', interestJSON);
        return 'Success';
    } catch (error) {
        console.log(error);
        return error;
    }
}

app.listen(3000, () => {
    console.log('The server is up and listening on port 3000')
});