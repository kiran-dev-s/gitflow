const {
    check,
    validationResult
} = require('express-validator');
const functions = require('../utils/functions');

module.exports = {

    homepage: (req, res, next) => {


        ;(async () => {
            let db = req.app.locals.db;
            let redisDb = req.app.locals.redisdb;
            let loginToken = req.cookies.token;
            let errors = validationResult(req);

            let userList = await new Promise(resolve => {
                const statement = {
                    text: "select id, fname, lname, email, phone from users",
                    values: []
                }
                db.query(statement, async function (err, obj) {
                    if (err) throw err;
                    let resultSet = await obj.rows
                    return resolve(resultSet);
                })
            })

      
            res.render("index.ejs",{userList:userList})
        })()


        
    },


    createPeople: (req, res, next) => {
       
        ;(async () => {
            let db = req.app.locals.db;
            let redisDb = req.app.locals.redisdb;
            let loginToken = req.cookies.token;
            let errors = validationResult(req);

            console.log('fname------------->', req.body.fname)
            console.log('lname------------->', req.body.lname)
            console.log('email------------->', req.body.email)
            console.log('phone------------->', req.body.phone)

            let insertQuery = await new Promise(resolve => {
                const statement = {
                    text: "insert into users(fname, lname, email, phone) values($1, $2, $3, $4) RETURNING id",
                    values: [req.body.fname, req.body.lname, req.body.email, req.body.phone]
                }
                db.query(statement, async function (err, obj) {
                    if (err) throw err;
                    let resultSet = await obj.rows[0]
                    return resolve(resultSet);
                })
            })

            console.log(insertQuery)

            if (insertQuery.id > 0) {
                res.json({
                    "status": "200",
                    "message": "success"
                })
            } else {
                res.json({
                    "status": "400",
                    "message": "fail"
                })
            }
        })()
    },


    getPeople:(req, res, next)=>{
        ;(async () => {
            let db = req.app.locals.db;
            let redisDb = req.app.locals.redisdb;
            let loginToken = req.cookies.token;
            let errors = validationResult(req);

           // console.log('id------------->', req.body.id)
            console.log('id------------->', req.body.id)


            let singleUser = await new Promise(resolve => {
                const statement = {
                    text: " select id, fname, lname, email, phone from users where  id = $1 ",
                    values: [req.body.id]
                }
                db.query(statement, async function (err, obj) {
                    if (err) throw err;
                    let resultSet = await obj.rows[0]
                    return resolve(resultSet);
                })
            })

            console.log(singleUser)

           res.json(singleUser)

        })()
    },


    updatepeople: (req, res, next) => {
       
        ;(async () => {
            let db = req.app.locals.db;
            let redisDb = req.app.locals.redisdb;
            let loginToken = req.cookies.token;
            let errors = validationResult(req);


            console.log('eedi------------->', req.body.eedi)
            console.log('fname------------->', req.body.fname)
            console.log('lname------------->', req.body.lname)
            console.log('email------------->', req.body.email)
            console.log('phone------------->', req.body.phone)

            let insertQuery = await new Promise(resolve => {
                const statement = {
                    text: "update users set fname = $1, lname = $2, email = $3, phone = $4 where id = $5",
                    values: [req.body.fname, req.body.lname, req.body.email, req.body.phone, req.body.eedi]
                }
                db.query(statement, async function (err, obj) {
                    if (err) throw err;
                    let resultSet = await obj.rows[0]
                    return resolve(resultSet);
                })
            })

            console.log(insertQuery)

    
                res.json({
                    "status": "200",
                    "message": "success"
                })
           
        })()
    },


    delete: (req, res, next) => {
       
        ;(async () => {
            let db = req.app.locals.db;
            let redisDb = req.app.locals.redisdb;
            let loginToken = req.cookies.token;
            let errors = validationResult(req);


            console.log('eedi------------->', req.body.id)
 

            let deleteUser = await new Promise(resolve => {
                const statement = {
                    text: "delete from users where id = $1",
                    values: [req.body.id]
                }
                db.query(statement, async function (err, obj) {
                    if (err) throw err;
                    let resultSet = await obj.rows[0]
                    return resolve(resultSet);
                })
            })

            res.json({"status": "200","message": "success"})
           
        })()
    },


    getSearchData:(req,res,next) =>{
        ;(async()=>{
            let db = req.app.locals.db;
            let redisDb = req.app.locals.redisdb;
            let loginToken = req.cookies.token;
            let errors = validationResult(req);
            console.log('searchvalue------------->', req.body.searchvalue)
            let deleteUser = await new Promise(resolve => {
                const statement = {
                    text: "SELECT * FROM users WHERE fname = $1 ",
                    values: [req.body.searchvalue]
                }
                console.log(statement)

                db.query(statement, async function (err, obj) {
                    if (err) throw err;
                    let resultSet = await obj.rows
                    return resolve(resultSet);
                })
            })
            console.log(deleteUser)
            res.json(deleteUser)
        })()

    },

    getAllPeople:(req,res, next)=>{
        ;(async()=>{

            console.log(req.body.id)

            let db = req.app.locals.db;
            let redisDb = req.app.locals.redisdb;
            let loginToken = req.cookies.token;
            let errors = validationResult(req);
            let getAlluser = await new Promise(resolve => {
                const statement = {
                    text: "SELECT * FROM users where id = $1 ",
                    values: [req.body.id]
                }
            
                db.query(statement, async function (err, obj) {
                    if (err) throw err;
                    let resultSet = await obj.rows
                    return resolve(resultSet);
                })
            })
            console.log(getAlluser)
            res.json(getAlluser)
        })()

    }


}