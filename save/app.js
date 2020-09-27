var AWS = require("aws-sdk");
var origin = "";

exports.lambdaHandler = function (event, context, callback) {
  //console.log("Event: ", event);
  origin = event.headers.Origin;
  var course = event.body;

  //var course = JSON.parse(body);
  console.log("Recieved course to save: ", course);

  // Create DynamoDB object
  var ddb = new AWS.DynamoDB.DocumentClient({ region: "eu-north-1" });
  // Call DynamoDB
  ddb.put(createDdbParams(course), function (err, data) {
    if (err) {
      console.log("Error while saving a course with ID " + course.id, err);
      callback(Error(err), null);
    } else {
      console.log("Successfully saved a course with ID ", course.id);
      callback(null, respond(200, course));
    }
  });
};

function respond(status, course) {
  const o = getAllowedOrigin();
  console.log("Got origin: ", o);
  return {
    statusCode: status,
    headers: {
      "Access-Control-Allow-Origin": o,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      course: course,
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

function createDdbParams(course) {
  return {
    TableName: process.env.DDB_TABLE,
    Item: {
      id: course.id,
      name: course.name,
      description: course.description,
      category: course.category,
      price: course.price,
    },
  };
}
