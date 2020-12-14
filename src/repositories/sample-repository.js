const AWS = require('aws-sdk');

class SampleRepository {
  constructor() {
    const config = {
      region: process.env.REGION,
    };
    // set endpoint for DynamoDB Local
    if (process.env.DB_ENDPOINT) {
      config.endpoint = process.env.DB_ENDPOINT;
    }
    this.docClient = new AWS.DynamoDB.DocumentClient(config);
    this.tableName = process.env.DB_NAME;
  }

  /**
   * put one item into table
   * @param {Object} item
   * @param {string} item.id
   * @param {string} item.message
   * @param {Date} item.updatedAt
   * @throws
   * @returns {Object}
   * {
   *   id: string
   *   message: string
   *   updatedAt: Date
   * }
   */
  async putItem(item) {
    const params = {
      TableName: this.tableName,
      Item: {
        Id: item.id,
        Message: item.message,
        UpdatedAt: item.updatedAt.toISOString(),
      },
    };
    await this.docClient.put(params).promise();
    return item;
  }

  /**
   * get one item
   * @param {string} id
   * @throws
   * @returns {Object}
   * {
   *   id: string
   *   message: string
   *   updatedAt: Date
   * }
   */
  async getItemById(id) {
    const params = {
      TableName: this.tableName,
      Key: {
        Id: id,
      },
    };
    const result = await this.docClient.get(params).promise();
    // return null if object is not found
    if (!Object.keys(result).length) {
      return null;
    }
    return {
      id: result.Item.Id,
      message: result.Item.Message,
      updatedAt: new Date(result.Item.UpdatedAt),
    };
  }
}

module.exports = new SampleRepository();
