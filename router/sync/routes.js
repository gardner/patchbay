const nest = require('depnest')
const { isBlob, isFeed, isMsg } = require('ssb-ref')

exports.gives = nest('router.sync.routes')

exports.needs = nest({
  'keys.sync.id': 'first',
  'public.html.page': 'first',
  'private.html.page': 'first',
  'notifications.html.page': 'first',
  'profile.html.page': 'first',
  'blob.html.page': 'first',
  'profile.html.page': 'first',
  'thread.html.page': 'first',
  'channel.html.page': 'first'
})

exports.create = (api) => {
  const myId = api.keys.sync.id()

  return nest('router.sync.routes', (sofar = []) => {
    const routes = [
      ['/public',        () => api.public.html.page()],
      ['/private',       () => api.private.html.page()],
      ['/notifications', () => api.notifications.html.page()],
      ['/profile',       () => api.profile.html.page({ id: myId })],
      ['/:key', (params) => {
        const { key } = params
        if (isBlob(key))    return api.blob.html.page(params)
        if (isFeed(key))    return api.profile.html.page(params)
        if (isMsg(key))     return api.thread.html.page(params)
        if (isChannel(key)) return api.channel.html.page(params)
      }]
    ]

    return [...sofar, ...routes]
  }
}

function isChannel (str) {
  typeof str === 'string' && str[0] === '#' && str.length > 1
}
