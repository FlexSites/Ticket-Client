module.exports = {
  port: 3000,
  mongo: {
    url: 'localhost/ticketing',
  },
  s3: {
    apiVersion: '2006-03-01',
    region: 'us-east-1',
    params: {
      Bucket: 'flexsites-stage',
    },
  },
}
