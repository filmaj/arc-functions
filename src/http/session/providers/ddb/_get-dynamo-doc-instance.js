let aws = require('aws-sdk')
let testing = process.env.NODE_ENV === 'testing'
let passthru = !process.env.hasOwnProperty('SESSION_TABLE_NAME')
let port = process.env.ARC_TABLES_PORT || 5000
let endpoint = new aws.Endpoint(`http://localhost:${port}`)
let region = 'us-west-2'

// if SESSION_TABLE_NAME isn't defined we mock the client and just pass session thru
let mock = {
  get(params, callback) {
    callback()
  },
  put(params, callback) {
    callback()
  }
}

module.exports = testing? new aws.DynamoDB.DocumentClient({endpoint, region}) : (passthru? mock : new aws.DynamoDB.DocumentClient)
