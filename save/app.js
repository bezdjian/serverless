const AWS = require("aws-sdk");
let origin = "";

exports.lambdaHandler = function (event, context, callback) {
  // THIS will NOT work with sam local invoke -e event.json, only start-api.
  // Origin is sometimes small letter ?!?!
  console.log("Event; ");
  console.log(event);
  origin = event.headers.Origin ? event.headers.Origin : event.headers.origin;

  const student = JSON.parse(event.body);
  // Create DynamoDB object
  const ddb = new AWS.DynamoDB.DocumentClient({ region: "eu-north-1" });
  // Call DynamoDB
  ddb.put(createDdbParams(student), function (err, data) {
    if (err) {
      console.log("Error while saving student with ID " + student.id, err);
      callback(Error(err.message), null);
    } else {
      console.log("Successfully saved student with ID ", student.id);
      callback(null, respond(200, student));
    }
  });
};

function respond(status, student) {
  return {
    statusCode: status,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": getAllowedOrigin(),
      "Access-Control-Allow-Methods": "OPTIONS,POST",
    },
    body: JSON.stringify({
      student: student,
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
  if (allowedOrigins.includes(origin)) return origin;

  return "";
}

function createDdbParams(student) {
  console.log(
    "Saving student: " + student + " in table: " + process.env.DDB_TABLE
  );
  return {
    TableName: process.env.DDB_TABLE,
    Item: {
      id: student.id,
      firstname: student.firstname,
      lastname: student.lastname,
      email: student.email,
      username: student.username,
      country: student.country,
    },
  };
}
