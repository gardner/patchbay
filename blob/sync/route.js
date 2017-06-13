const nest = require('depnest')
const { isBlob } = require('ssb-ref')

exports.gives = nest('router.sync.route')

exports.needs = nest('blob.html.page', 'first')

exports.create = (api) => {
  return nest('blob.sync.route', (path) => !isBlob(path)
    ? undefined
    : api.blob.html.page(path)
  )
}


