var config = module.exports = {
  dynamo: {
    region: 'us-east-1',
    accessKeyId: 'xxx',
    secretAccessKey: 'xxx',
    table: 'some-table-staging/users'
  }
}

if (process.env.NODE_ENV === 'production') {
  config.dynamo.table = 'some-table/users'
}
