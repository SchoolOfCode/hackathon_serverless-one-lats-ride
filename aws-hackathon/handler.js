"use strict"; //enables strict mode, which makes things that normally cause
//warnings error out (keeps the code cleaner)
const AWS = require("aws-sdk"); //requires AWS CLI that you set up with your credentials earlier
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: "2019.11.21" }); //creates a
//new instance of DynamoDB when called using the AWS SDK
const { v4: uuidv4 } = require("uuid"); //auto-generates unique ids

const bootcamperTable = process.env.TABLE;

//---------HELPER FUNCTION TO SEND RESPONSE JSONS WITH HEADERS:---------
const response = (statusCode, message) => {
  //takes in the status code and a message (an object) from the response
  return {
    statusCode: statusCode,
    //gives us back the status code it's received
    headers: {
      //sticks all the right headers on to talk to the request during the
      //preflight check (CORS)
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Methods": "GET, OPTIONS, POST, PUT, DELETE",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message), //stringifies the body object into JSON
  };
};

//This saves you from having to do these bits to process the response in each function :)
module.exports = response;
