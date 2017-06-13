const nest = require('depnest')
const sheetRouter = require('sheet-router')

exports.gives = nest('router.sync.router')

exports.needs = nest('router.sync.routes', 'reduce')

exports.create = (api) => {
  return nest('router.sync.router', () => {
    return sheetRouter(
      {default: '/public'},
      api.router.sync.routes()
    )
  }
}

