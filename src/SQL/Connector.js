const isSQLDisabled = true;

if (isSQLDisabled) return;

// const sql = require("mysql");
const {SQL_NAME, SQL_HOST, SQL_USER, SQL_PASS} = require("../../config.json");

const mysql = sql.createPool({
    database: SQL_NAME,
    host: SQL_HOST,
    user: SQL_USER,
    password: SQL_PASS
});
  

module.exports = {
    sqlQuery(queryString) {
        return new Promise((resolve, reject) => {
          mysql.query(queryString, function (error, results, fields) {
            if (error) reject(error);
            resolve({ results, fields });
          });
        });
    }
};