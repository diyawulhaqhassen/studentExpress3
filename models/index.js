let {Sequelize,DataTypes}= require('sequelize')

let env =process.env.NODE_ENV || 'development'

// if app running on heroku , heroku will set the environment
// variable called NDE_ENV which will have the value production
// so the env variable in this code will be 'production'

let config = require(__dirname+ '/../config.json')[env]

let db={}
let sequelize

if (config.use_env_variable){
    sequelize=new sequelize(process.env[config.use_env_variable],config)
}else {
    // run locally,development mode, use SQLite

    sequelize =new Sequelize(config)
}

let  studentModel =require('./student')(sequelize,DataTypes)

db[studentModel.name] =studentModel

db.sequelize =sequelize  // info on how to connect to the database
db.sequelize =sequelize // reference to sequelize library

module.exports =db
