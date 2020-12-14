const AWS = require('aws-sdk');

class S3Client {
  constructor() {
    this.s3 = new AWS.S3({
      region: process.env.REGION,
    });
  }

  /**
   * List S3 objects
   * @param {string} bucket
   * @param {string} prefix
   * @throws
   * @returns {Object}
   */
  async listObjects(bucket, prefix) {
    const params = {
      Bucket: bucket,
      Prefix: prefix,
    };
    const data = await this.s3.listObjectsV2(params).promise();
    return data.Contents;
  }

  /**
   * Get S3 object
   * @param {string} bucket
   * @param {string} key
   * @throws
   * @returns {Object}
   */
  async getObject(bucket, key) {
    const params = {
      Bucket: bucket,
      Key: key,
    };
    const data = await this.s3.getObject(params).promise();
    return data.Body.toString('utf-8');
  }

  /**
   * Put S3 Object
   * @param {string} bucket
   * @param {string} key
   * @param {string} content
   * @throws
   * @returns {Object}
   */
  async putObject(bucket, key, content) {
    const params = {
      Bucket: bucket,
      Key: key,
      ServerSideEncryption: 'AES256',
      Body: content,
    };
    const data = await this.s3.putObject(params).promise();
    return data;
  }
}

module.exports = new S3Client();
