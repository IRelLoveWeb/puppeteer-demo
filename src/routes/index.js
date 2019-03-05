const router = require('koa-router')()

const php = require('./php')
router.use('/php', php.routes(), php.allowedMethods())

const web = require('./web')
router.use('/web', web.routes(), web.allowedMethods())

module.exports = router
