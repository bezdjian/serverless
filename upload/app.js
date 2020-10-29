var AWS = require("aws-sdk");
var origin = "";

exports.lambdaHandler = function (event, context, callback) {
  console.log("EVENT: ", event);
  // Origin is sometimes small letter ?!?!
  origin = event.headers.Origin ? event.headers.Origin : event.headers.origin;
  
  //let encodedImage = JSON.parse(event.body);
  let decodedImage = event.isBase64Encoded
    ? Buffer.from(event.body, "base64")
    : event.body;

  var filePath = "course_images/" + event.queryStringParameters.filename + ".jpg";
  console.log("File path: ", filePath);
  
  var params = {
    Bucket: process.env.BUCKET_NAME,
    Body: decodedImage,
    Key: filePath,
  };

  console.log("Creating S3");
  s3 = new AWS.S3({ apiVersion: "2006-03-01" });
  console.log("Calling s3.upload");
  s3.putObject(params, function (err, data) {
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
