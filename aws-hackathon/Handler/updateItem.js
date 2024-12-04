'use strict';
const AWS = require('aws-sdk');
const db = AWS.DynamoDB.DocumentClient({ apiVersion: '2019.11.21' });
const bootcamperTable = process.env.TABLE;
const response = require('../handler');

// ------------- Update Item by ID -------------

module.exports.updateItem = (event, context, callback) => {
  const id = event.pathParameters.id;

  const reqBody = JSON.parse(event.body);

  const item = {
    id: id,
    createdAt: reqBody.createdAt,
    name: reqBody.name,
    interests: reqBody.interests,
  };

  return db
    .put({
      TableName: bootcamperTable,
      Item: item,
    })
    .promise()
    .then((res) => {
      callback(null, response(200, res));
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
};
