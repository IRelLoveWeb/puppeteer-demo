const router = require('koa-router')()
const {insertEQs, get_text_with_type} = require('../utils/db.js')

router.post('/one', async ctx => {
  const {type , url} = ctx.request.body
  try{
    const page = await ctx.browser.newPage()
    await page.goto(url)
    let htmls = await page.evaluate(() => {
      const reg = /^\d+\./
      return Array.from($('strong')).map(item => item.innerHTML.replace(/^\d{1,3}./,''))
    })
    let data = get_text_with_type(htmls, type)
    let flag = await insertEQs(data)

    if(flag) {
      ctx.body = {
        code: 200,
        msg: '操作成功'
      }
    }else{
      ctx.body = {
        code: -1,
        msg: '爬取数据失败'
      }
    }


  }catch(err){
    throw(err)
  }
})

module.exports = router
