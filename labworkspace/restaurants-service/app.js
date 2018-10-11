'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const AWS = require('aws-sdk')

// Import resources
const restaurants = require('./restaurants')

// TODO: Set the correct AWS region for your app
AWS.config.update({ region: 'us-west-2' })

// declare a new express app and add the plugin to read JSON requests
const app = express()
app.use(bodyParser.json())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

// The DocumentClient class allows us to interact with DynamoDB using normal objects. 
// Documentation for the class is available here: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html
const dynamoDb = new AWS.DynamoDB.DocumentClient()


// API declaration
app.get('/restaurants', function(req, res) {
    restaurants.getRestaurants(null, dynamoDb, function(status, data) {
        res.status(status).json(data)
    })
})

// If the environment variable is not declared we assume the application
// is not running inside Lambda (local testing) and therefore we start
// the embedded express HTTP server.
if (!process.env.RESTAURANTS_TABLE) {
    let server = app.listen(function() {
        var host = server.address().address;
        if (host == "::") {
            host = "localhost";
        }
        var port = server.address().port;
        console.log("Example app listening at http://%s:%s/restaurants", host, port);
    })
}
// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from 
// this file
module.exports = app
