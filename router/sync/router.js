const sheetRouter = require('sheet-router')
const { isBlob, isFeed, isMsg } = require('ssb-ref')

const myId = api.keys.sync.id()
const router = sheetRouter([
  // reduce in other routes
  ['/profile', () => api.profile.html.page({ id: myId })],
  ['/channel/:channel', (params) => api.channel.html.page(params)],
  ['#:channel', (params) => api.channel.html.page(params)],
  ['/:id', (params) => {
    const { id } = params
    if (isBlob(id)) return api.blob.html.page(params)
    if (isFeed(id)) return api.profile.html.page(params)
    if (isMsg(id))  return api.thread.html.page(params)
  }]


])

