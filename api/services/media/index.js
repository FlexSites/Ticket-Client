const AWS = require('aws-sdk')
const s3 = new AWS.S3({ apiVersion: '2006-03-01' })
const uuid = require('uuid')
const mime = require('mime-types')

exports.getSignedUrl = async (viewer, params) => {
  // TODO: AuthZ
  Object.assign({
    Key: `ticketing/${ uuid.v4() }.${ mime.extension(params['Content-Type']) }`,
    Bucket: 'flexsites-stage',
  })
  const url = await s3.getSignedUrl('putObject', params).promise()
  return { url }
  // TODO: Logging
  // TODO: Eventing
}
