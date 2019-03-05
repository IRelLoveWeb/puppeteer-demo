const router = require('koa-router')()

router.post('/one', async ctx =>{
    const page = await ctx.browser.newPage()
    // await page.goto('https://blog.csdn.net/qq_32865887/article/details/79398095')
    // const data = await page.evaluate(() => {
    //     const reg = /^\d+\./
    //     return Array.from($('p')).reduce((total, item) => {
    //         let html = item.innerHTML
    //         let res = reg.exec(html)
    //         if(res){
    //             html = html.split('<br>\n')[0].replace(res[0], '')
    //             total.push(html)
    //         }   
    //         return total     
    //     }, [])
    // })
    page.close()

    // sadadaq
    ctx.body = {
        code: 200,
        data
    }
})


module.exports = router