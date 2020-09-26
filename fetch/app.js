var AWS = require("aws-sdk");

exports.lambdaHandler = function (event, context, callback) {
  console.log("Event: ", event);
  console.log("process.env.DDB_TABLE: ", process.env.DDB_TABLE);
  // const ret = await axios(url);

  //Create Dynamo DB
  var ddb = new AWS.DynamoDB.DocumentClient({ region: "eu-north-1" });
  var params = {
    TableName: process.env.DDB_TABLE,
  };
  
  //Scan the table
  ddb.scan(params, function (err, data) {
    if (err) {
      console.log("Error", err);
      callback(Error(err), null);
    } else {
      console.log("Courses: ", data.Items.length);
      callback(null, respond(200, data.Items));
      /*data.Items.forEach(function (element, index, array) {
        console.log("Element: ", element);
      });*/
    }
  });
};

function respond(status, list) {
  return {
    statusCode: status,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000" 
    },
    body: JSON.stringify({
      courses: list,
    }),
  };
}
