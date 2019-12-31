// the module for all the functionality related to the CRUD functionality of my app
const fs = require("fs");

const addInquiry = (inquiry) => {
    const inquiryArr = loadInquiries();
    // load the array on Inquiries synchronously
    inquiryArr.push(inquiry);
    // add the new one to the array

    const saved = saveInqueries(inquiryArr);
    // pass back the array to be saved and record the result in a variable
    return saved;
    // return the event variable and let the API determine the success or failure
}

const saveInqueries = (inquiryArr) => {
    // abstracting as much as I can away to keep things functional by having all 'saves' take place 
    // through this method
    const inquiryJSON = JSON.stringify(inquiryArr);

    try {
        fs.writeFileSync(__dirname + '/../misc/inquiries.json', inquiryJSON);
        return {success: 'Successfully saved inquiries'};
    } catch (error) {
        console.log(error);
        return error;
    }
}

const loadInquiries = () => {
    // FS.readFileSync functions such that if the file is empty/doesn't exist, it just throws an error
    // I compensate for this using a try catch block, and just return an empty [] on error
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