var AWS = require("aws-sdk");
var origin = "";

exports.lambdaHandler = function (event, context, callback) {
  origin = event.headers.origin;
  //Create Dynamo DB
  var ddb = new AWS.DynamoDB.DocumentClient({ region: "eu-north-1" });
  var params = {
    TableName: process.env.DDB_TABLE,
  };

  //Scan the table
  ddb.scan(params, function (err, data) {
    if (err) {
      console.log("Error while fetching courses", err);
      callback(Error(err), null);
    } else {
      console.log("Fetched " + data.Items.length + " courses.");
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
      "Access-Control-Allow-Origin": getAllowedOrigin(),
    },
    body: JSON.stringify({
      courses: list,
    }),
  };
}

function getAllowedOrigin() {
  // Setting the local React and S3 hosted app as allowed origins.
  const allowedOrigins = [
    "http://localhost:3000",
    "http://mylms-frontend.s3-website.eu-west-2.amazonaws.com",
  ];
  if (allowedOrigins.includes(origin)) return origin;

  return "";
}
