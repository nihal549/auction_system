const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');

const Bucket = "";

const s3 = new S3({
  region: "",
  accessKeyId: "",
  secretAccessKey: '',
});

// Upload file to S3 bucket
exports.uploadFile = (file) => {

  const fileStream = fs.createReadStream(file.path);
  console.log(file.path)
  const uploadParams = {
    Bucket,
    Body: fileStream,
    Key: file.filename,
  };

   //return promise 
  return s3.upload(uploadParams).promise();
};

// Get file from S3 bucket
exports.getFileStream = async (fileKey) => {
  const downloadParams = {
    Bucket,
    Key: fileKey,
  };
  const file = await s3.getObject(downloadParams).promise();
  console.log(file)
  return file.Body;
};
