const AWS = require('aws-sdk');

class S3Service {
  constructor() {
    this.s3 = new AWS.S3({
      region: process.env.REGION,
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY
    });
  }

  async listObjects(bucket, prefix) {
    const params = {
      Bucket: bucket,
      Prefix: prefix
    };
    const data = await this.s3.listObjectsV2(params).promise();
    return data.Contents;
  }

  async getObject(bucket, key) {
    const params = {
      Bucket: bucket,
      Key: key
    };
    const data = await this.s3.getObject(params).promise();
    return data.Body.toString('utf-8');
  }

  async putObject(bucket, key, content) {
    const params = {
      Bucket: bucket,
      Key: key,
      ServerSideEncryption: 'AES256',
      Body: content
    };
    const data = await this.s3.putObject(params).promise();
    return data;
  }
}

module.exports = new S3Service();
