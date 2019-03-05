const {query} = require('./mysql.js')
const kws = require('./kws.json')
const moment = require('moment')

// 根据知识点分配问题, 排除无法判断的问题
// type: web php ...
function get_text_with_type(htmls, type){
  return htmls.reduce((total, text) => {
    let stype = _get_spot_type(type, text)
    //
    if(!stype) return total

    if(!total.hasOwnProperty(stype)){
      total[stype] = [text]
    }else{
      total[stype].push(text)
    }
    return total
  }, {})
}

// 根据关键字段获取每一个问题的类型
function _get_spot_type(type, text){
  const types = kws[type]
  for(let spot in types) {
    // 关键字
    const keys = types[spot]
    if(keys.some(key => text.includes(key))){
      return spot
    }
  }
}

async function insertEQs(data){
  try {
    let vals = []
    for(let type in data){
      let questions = data[type]
      for(let i=0; i<questions.length; i++){
        vals.push(`('${questions[i]}', '${type}', '刘映峰', ${moment().unix()}, 1)`)
      }
    }
    let sql = `INSERT INTO external_questions(question, type, author, create_time, audit) VALUES ${vals.join()}`
    let {affectedRows} = await query(sql)

    return affectedRows > 0
  }catch(err) {
    console.log(err)
  }
}

module.exports = {
  insertEQs,
  get_text_with_type
}
