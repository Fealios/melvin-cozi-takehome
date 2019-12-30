const fs = require("fs");

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

module.exports = {
    addInquiry: addInquiry,
    saveInqueries: saveInqueries,
    loadInquiries: loadInquiries
}