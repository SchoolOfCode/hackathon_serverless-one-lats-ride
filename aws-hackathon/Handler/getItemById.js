'use strict'; //enables strict mode, which makes things that normally cause
//warnings error out (keeps the code cleaner)
const AWS = require('aws-sdk'); //requires AWS CLI that you set up with your credentials earlier
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: '2019.11.21' }); //creates a
//new instance of DynamoDB when called using the AWS SDK
const { v4: uuidv4 } = require('uuid'); //auto-generates unique ids

const bootcamperTable = process.env.TABLE;
const response = require('../handler'); // response helper function

// ------------- Get A Single Item In The Table -------------

module.exports.getItemById = (event, context, callback) => {
  const id = event.pathParameters.id; //gets the id out of the parameters of
  //the event aka the request (the DynamoDB equivalent of doing req.params)

  const params = {
    //separate params object to tell the db which table and to use the id as
    //the key (which will work because we set up the id in the YAML to be the
    //partition key)
    Key: {
      id: id,
    },
    TableName: bootcamperTable,
  };

  return db
    .get(params) //passes the params object to get method to use it to look for the id in the table
    .promise()
    .then((res) => {
      if (res.Item) callback(null, response(200, res.Item));
      //checks if there's an item with that id; if so, it's in res.Item
      else
        callback(
          null,
          response(404, { error: 'No item with that name found' })
        ); //if it doesn't find anything w/ that id, 404 error instead
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
};
