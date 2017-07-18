const { all, any } = require('./authorize')
const toViewer = require('./authenticate')

exports.all = all
exports.any = any
exports.toViewer = toViewer
exports.middleware = () => async (req, res, next) => {
  try {
    const viewer = await toViewer(req)
    res.locals.viewer = viewer
    next()
  } catch (ex) {
    next(ex)
  }
}
