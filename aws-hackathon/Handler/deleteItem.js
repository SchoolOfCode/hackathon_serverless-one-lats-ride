'use strict';
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: '2019.11.21' });
const bootcamperTable = process.env.TABLE;
const response = require('../handler');

module.exports.deleteItem = (event, context, callback) => {
  const id = event.pathParameters.id;
  const params = {
    Key: {
      id: id,
    },
    TableName: bootcamperTable,
  };
  return db
    .delete(params)
    .promise()
    .then(() =>
      callback(null, response(200, { message: `${id} deleted successfully` }))
    )
    .catch((err) => callback(null, response(err.statusCode, err)));
};
