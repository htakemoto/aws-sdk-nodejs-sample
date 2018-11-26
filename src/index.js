require('dotenv').config();

const s3Service = require('./services/s3-service');

async function main() {
  try {
    let bucket = '';
    let key = '';

    // list objects
    const prefix = 'S3-OBJECT-PREFIX';
    const data1 = await s3Service.listObjects(bucket, prefix);
    console.log(data1);

    // get object
    key = 'S3-OBJECT-KEY';
    const data2 = await s3Service.getObject(bucket, key);
    console.log(data2);

    // put object
    bucket = 'S3-Bucket';
    key = 'path/test.txt';
    const data3 = await s3Service.putObject(bucket, key, 'contents here');
    console.log(data3);
  } catch (err) {
    console.error(err);
  }
}

main();
