'use strict'; //enables strict mode, which makes things that normally cause
//warnings error out (keeps the code cleaner)
const AWS = require('aws-sdk'); //requires AWS CLI that you set up with your credentials earlier
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: '2019.11.21' }); //creates a
//new instance of DynamoDB when called using the AWS SDK

const bootcamperTable = process.env.TABLE;
const response = require('../handler'); // response helper function

// ------------- Get All Items In The Table -------------

module.exports.getAllItems = (event, context, callback) => {
  return (
    db
      .scan({
        TableName: bootcamperTable,
      })
      .promise()
      .then((res) => callback(null, response(200, res.Items))) //status code 200 for success
      //message becomes JSON with all of the items in the table
      .catch((err) => callback(null, response(err.statusCode, err)))
  ); //error handling
  //gets the status code from the error and the error itself as the message
};
