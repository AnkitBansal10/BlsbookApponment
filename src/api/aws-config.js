// aws-config.js
import AWS from 'aws-sdk';

AWS.config.update({
  region: "ap-south-1",
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "ap-south-1:0498f5dd-cbf1-4e8c-b43a-984eea3b0f60", 
  }),
});
// Create S3 instance
const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: "blsocrtestbucket" }, 
});

export {s3 };