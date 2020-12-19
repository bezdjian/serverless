const AWS = require("aws-sdk");
let origin = "";

exports.lambdaHandler = function(event, context, callback) {
  console.log("EVENT: ", event);
  // Origin is sometimes small letter ?!?!
  origin = event.headers.Origin ? event.headers.Origin : event.headers.origin;

  //let encodedImage = JSON.parse(event.body);
  let decodedImage = event.isBase64Encoded
    ? Buffer.from(event.body, "base64")
    : event.body;

  const filePath = "course_images/" + event.queryStringParameters.filename;
  console.log("File path: ", filePath);

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Body: decodedImage,
    Key: filePath,
  };

  const s3 = new AWS.S3({apiVersion: "2006-03-01"});
  s3.upload(params, function(err, data) {
    if(err) {
      console.log("Error", err);
      callback(new Error(err.message), null);
    }
    if(data) {
      console.log("Upload Success", data);
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
  if(allowedOrigins.includes(origin)) return origin;

  return "";
}
