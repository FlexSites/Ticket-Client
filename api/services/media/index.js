const AWS = require('aws-sdk')
const config = require('config')
const uuid = require('uuid')
const mime = require('mime-types')

const s3 = new AWS.S3(config.get('s3'))

exports.getSignedUrl = async (viewer, id = uuid.v4(), params = {}) => {
  // TODO: AuthZ

  // params.ContentType = params['Content-Type']
  // delete params['Content-Type']
  const url = s3.getSignedUrl('putObject', {
    Bucket: 'flexsites-stage',
    Key: `ticketing/${ id }.${ mime.extension(params['Content-Type']) }`,
    Expires: 60,
    ContentType: params['Content-Type'],
    ACL: 'public-read',
  })
  return { url }
  // TODO: Logging
  // TODO: Eventing
}
