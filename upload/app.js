var AWS = require("aws-sdk");
var origin = "";

exports.lambdaHandler = function (event, context, callback) {
  console.log("EVENT: ", event);
  // Origin is sometimes small letter ?!?!
  origin = event.headers.Origin ? event.headers.Origin : event.headers.origin;

  s3 = new AWS.S3({ apiVersion: "2006-03-01" });
  // Extract file content
  let fileContent = event.isBase64Encoded
    ? Buffer.from(event.body, "base64")
    : event.body;

  var uploadParams = {
    Bucket: process.env.BUCKET_NAME,
    Key: "course_images/" + event.queryStringParameters.filename,
    Body: fileContent,
  };

  s3.upload(uploadParams, function (err, data) {
    if (err) {
      console.log("Error", err);
      callback(Error(err), null);
    }
    if (data) {
      console.log("Upload Success", data.Location);
      callback(null, respond(200, data.Location));
    }
  });
};

function respond(status, message) {
  return {
    statusCode: status,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": getAllowedOrigin(),
      "Access-Control-Allow-Methods": "OPTIONS,POST",
    },
    body: JSON.stringify({
      message: message,
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
