// the API for managing my HTTP requests

const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');

const inquiries = require('./inquiries');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors());
// parse the body of the response to make it easily usable
// add CORS allowance so that the "server" can actually talk to the app

app.get('/', (req, res) => {
    res.send(inquiries.loadInquiries());
})

app.post('/', (req, res) => {
    if (!req.body) {
        res.send({error: 'Please include a body in your request'});
    } else {
        const inquiry = req.body;
        const event = inquiries.addInquiry(inquiry);
        // the event keeps track of the success or failure of the POST request

        if (event.success) {
            // my custom success object is only passed if everything works,
            // so if it's not populate, send an error
            res.status(200).send({success: 'Added new inquiry'});
        } else {
            res.status(500).send(event);
        }
    }
})

app.listen(3000, () => {
    console.log('The server is up and listening on port 3000')
});