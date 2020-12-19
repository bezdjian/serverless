const AWS = require("aws-sdk");
let origin = "";

exports.lambdaHandler = function(event, context, callback) {
  console.log("Event: ", event);
  // Origin is sometimes small letter ?!?!
  origin = event.headers.Origin ? event.headers.Origin : event.headers.origin;

  const {courseId} = event.pathParameters;

  //Create Dynamo DB
  const ddb = new AWS.DynamoDB.DocumentClient({region: "eu-north-1"});

  ddb.delete(createParam(courseId), function(err, data) {
    if(err) {
      console.log("Error while removing course with ID " + courseId, err);
      callback(new Error(err.message), null);
    } else {
      console.log("Successfully removed course with ID " + courseId);
      callback(null, respond(200, courseId));
    }
  });
};

function respond(status, response) {
  return {
    statusCode: status,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": getAllowedOrigin(),
      "Access-Control-Allow-Methods": "OPTIONS,DELETE",
    },
    body: JSON.stringify({
      course: response,
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

function createParam(courseId) {
  return {
    TableName: process.env.DDB_TABLE,
    Key: {
      id: courseId.toString(),
    },
  };
}
