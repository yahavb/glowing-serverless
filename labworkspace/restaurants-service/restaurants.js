const RESTAURANTS_TABLE = ( process.env.RESTAURANTS_TABLE ? process.env.RESTAURANTS_TABLE : "lab_restaurants" );
module.exports = {
    getRestaurants: function(filters, ddbClient, callback) {
        ddbClient.scan({ TableName: RESTAURANTS_TABLE }, function(err, data) {
            if (err) {
                console.log(err)
                callback(500, {
                    message: "Could not load restaurants"
                }).end()
            } else {
                callback(200, data['Items'])
            }
        })
    }
}
