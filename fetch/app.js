const AWS = require("aws-sdk");
let origin = "";

exports.lambdaHandler = function(event, context, callback) {
  origin = event.headers.origin;
  const {proxy} = event.pathParameters;

  //Create Dynamo DB
  const ddb = new AWS.DynamoDB.DocumentClient({region: "eu-north-1"});
  //Scan the table
  ddb.scan(createParams(proxy), function(err, data) {
    if(err) {
      console.log("Error while fetching students", err);
      callback(new Error(err.message), null);
    } else {
      console.log(`Fetched ${data.Items.length} students.`);
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
      students: list,
    }),
  };
}

function getAllowedOrigin() {
  // Setting the local React and S3 hosted app as allowed origins.
  const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://mylms-frontend-app.s3-website.eu-north-1.amazonaws.com",
  ];
  if(allowedOrigins.includes(origin)) return origin;

  return "";
}

function createParams(proxy) {
  const tableName = process.env.DDB_TABLE;

  if(proxy === "all") {
    // Return only table name, it scans and returns the whole table.
    return {
      TableName: tableName,
    };
  } else {
    return {
      TableName: tableName,
      // Selecting Columns, 'name' is reserved, that's why made it like a variable.
      ProjectionExpression: "#id, firstname, lastname, email, username",
      // The 'Query' we will pass the value as variable
      FilterExpression: "#id = :id",
      // Applying the column names as variables to their values.
      ExpressionAttributeNames: {
        "#id": "id",
      },
      // Applying the variable in the 'Query' to it value.
      ExpressionAttributeValues: {
        ":id": proxy,
      },
    };
  }
}
