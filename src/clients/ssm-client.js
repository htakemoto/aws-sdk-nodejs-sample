const AWS = require('aws-sdk');

class SSMClient {

  constructor() {
    this.ssm = new AWS.SSM({
      region: process.env.REGION,
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY
    });
  }

  /**
   * Get parameter store
   * @param {string} name
   * @throws
   * @returns {Object}
   * {
   *   Name: string,
   *   Type: string,
   *   Value: string,
   *   Version: number,
   *   LastModifiedDate: Date,
   *   ARN: string
   * }
   */
  async getParameter(name) {
    const params = {
      Name: name,
      WithDecryption: true // decrypt value when value is encrypted
    };
    const res = await this.ssm.getParameter(params).promise();
    return res.Parameter;
  }

  /**
   * Create parameter store
   * @param {string} name
   * @param {string} value
   * @param {boolean} isSecureString
   * @throws
   * @returns {Object}
   * {
   *   Version: number
   * }
   */
  async createParameter(name, value, isSecureString = false) {
    const params = {
      Name: name,
      Value: value,
      Overwrite: false,
      Type: isSecureString ? 'SecureString' : 'String'
    };
    const res = await this.ssm.putParameter(params).promise();
    return res;
  }

  /**
   * Update parameter store
   * @param {string} name
   * @param {string} value
   * @param {boolean} isSecureString
   * @throws
   * @returns {Object}
   * {
   *   Version: number
   * }
   */
  async updateParameter(name, value, isSecureString = false) {
    const params = {
      Name: name,
      Value: value,
      Overwrite: true,
      Type: isSecureString ? 'SecureString' : 'String'
    };
    const res = await this.ssm.putParameter(params).promise();
    return res;
  }

  /**
   * delete parameter store
   * @param {string} name
   * @throws
   */
  async deleteParameter(name) {
    const params = {
      Name: name
    };
    await this.ssm.deleteParameter(params).promise();
  }
}

module.exports = new SSMClient();
