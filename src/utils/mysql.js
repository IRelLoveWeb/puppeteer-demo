const mysql = require('mysql')

const config = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'interview'
}

const pool = mysql.createPool(config)

let query = function (sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                })
                connection.release()
            }
        })
    })
}

module.exports = {query}
