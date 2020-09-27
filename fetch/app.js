var AWS = require("aws-sdk");
var origin = "";

exports.lambdaHandler = function (event, context, callback) {
  origin = event.headers.origin;
  var { proxy } = event.pathParameters;
  
  //Create Dynamo DB
  var ddb = new AWS.DynamoDB.DocumentClient({ region: "eu-north-1" });
  //Scan the table
  ddb.scan(createParams(proxy), function (err, data) {
    if (err) {
      console.log("Error while fetching courses", err);
      callback(Error(err), null);
    } else {
      console.log("Fetched " + data.Items.length + " courses.");
      callback(null, respond(200, data.Items));
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
    "http://localhost:3001",
    "http://mylms-frontend.s3-website.eu-west-2.amazonaws.com",
  ];
  if (allowedOrigins.includes(origin)) return origin;

  return "";
}

function createParams(proxy) {
  // Digit Regex
  var reg = new RegExp("^\\d+$");

  if (proxy === "all") {
    // Return only table name, it scans and returns the whole table.
    return {
      TableName: process.env.DDB_TABLE,
    };
  } else if (reg.test(proxy)) {
    return {
      TableName: process.env.DDB_TABLE,
      // Columns, name is reserved, that's why made it like a variable.
      ProjectionExpression: "#id, category, description, #name, price",
      // The 'Query'
      FilterExpression: "#id = :id",
      // Applying the variables to their values.
      ExpressionAttributeNames: {
        "#id": "id",
        "#name": "name",
      },
      // Applying the variable in the 'Query' to it value.
      ExpressionAttributeValues: {
        ":id": proxy,
      },
    };
  }
}
