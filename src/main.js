const Koa = require('koa')
const puppeteer = require('puppeteer')
const bodyParser = require('koa-bodyparser')
const path = require('path')
const router = require('./routes')

const app = new Koa()
let browser 

;(async ()=>{
    browser = await puppeteer.launch({
        // 必须绝对路径
        executablePath: path.resolve(__dirname, './Chromium.app/Contents/MacOS/Chromium')
    })
    app.context.browser = browser
})()

app.use(require('koa-static')(__dirname + '/static'))
app.use(require('koa-views')(__dirname + '/static', {
    extension: 'html'
}))

app.use(async (ctx, next) => {
    try {
        if(ctx.path === '/' || ctx.path === '/favicon.ico'){
            return ctx.render('./index.html')
        }
    
        return next()
    }catch(err){
        console.log(err)
    }
})

app.use(bodyParser())

app.use(router.routes())

app.listen(9000)

app.on('error', err => {
    console.error('server error', err, ctx)
    app.context.browser = ''
    browser.close()
});

process.on('uncaughtException', function (err) {
    app.context.browser = ''
    browser.close()
    process.exit()
})