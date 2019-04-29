import sirv from 'sirv'
import polka from 'polka'
import compression from 'compression'
import * as sapper from '@sapper/server'
import requestIp from 'request-ip'

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

const app = polka() // You can also use Express
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    requestIp.mw(),
    sapper.middleware()
  )
  .listen(PORT, err => {
    if (err) console.log('error', err)
  })
// As per https://github.com/thgh/now-sapper
export default app.handler
