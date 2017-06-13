const nest = require('depnest')
const { h } = require('mutant')

exports.gives = nest('blob.html.page')

exports.needs = nest('blob.sync.url', 'first')

exports.create = (api) => {
  return nest('blob.html.page', blobView)

  function blobView (path) {
    return h('Blob', { id: path, title: path.slice(0, 9) + '...' }, [
      h('iframe', {
        src: api.blob.sync.url(path),
        sandbox: ''
      })
    ])
  }
}


