'use strict'; //enables strict mode, which makes things that normally cause
//warnings error out (keeps the code cleaner)
const AWS = require('aws-sdk'); //requires AWS CLI that you set up with your credentials earlier
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: '2019.11.21' }); //creates a
//new instance of DynamoDB when called using the AWS SDK
const { v4: uuidv4 } = require('uuid'); //auto-generates unique ids

const bootcamperTable = process.env.TABLE;
const response = require('../handler'); // response helper function

// ------------- Post New Item -------------

module.exports.addItem = (event, context, callback) => {
  /*   I've set up the example item below as a dictionary entry with a name 
  key and a definition key; you can have as many as you want (just like a 
    standard JSON); you just have to tell it what to expect below. Example JSON
     in request: {"name": "petrichor", "definition": "the smell after rain"} */

  const reqBody = JSON.parse(event.body); //parses the whole body out of
  //the event (the request) and saves it to a variable

  const item = {
    //creates the item that will then be added to the database, incl the bits
    //from the request body
    id: uuidv4(), //uses uuid to autogenerate a new unique id for the item
    createdAt: new Date().toISOString(), //automatically adds a human-readable date
    name: reqBody.name, //destructures the name string out of the request body
    //and saves it to the name key for the database
    interests: reqBody.interests, //destructures the definition string out
    //of the request body and saves it to the definition key for the database
  };

  return db
    .put({
      /* //passes the table name and the item we just created above to the put
        NOTE: even though it's creating a new item and is set up in the YAML 
        to respond to post requests, you still use put here when it's talking 
        directly to DynamoDB (it puts a new item rather than putting a 
          replacement here) */
      TableName: bootcamperTable,
      Item: item,
    })
    .promise()
    .then(() => {
      callback(null, response(200, item));
    })
    .catch((err) => response(null, response(err.statusCode, err)));
};
