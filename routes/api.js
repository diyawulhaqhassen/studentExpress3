let express =require('express')
let db =require('../models')
//const {where} = require("sequelize");
let Student =db.Student

let router=express.Router()

router.get('/students',function (req,res,next){
    Student.findAll({order:['present','StarId']}).then(students =>{
        return res.json(students)
    }).catch( err => next(err))
})

router.post('/students', function (req, res, next){
    Student.create(req.body).then(data =>{
        return res.status(201).send('ok')
    }).catch(err =>{
        // handle user errors e.g missing starID
        if (err instanceof db.Sequelize.ValidationError){
            let messages=err.errors.map(e=>e.message)
            return res.status(400).json(messages)
        }

        return  next(err)
    })
})

router.patch('/students/:id',function (req,res,next){

   // request is to / student /100
    let studentID=req.params.id
    let updatedStudent=req.body
    Student.update(updatedStudent,{where:{id: studentID}})
        .then((rowModified)=>{

            let  numberOfRowsModified =rowModified[0]// number of rows is changed

            if (numberOfRowsModified===1){// exactly one row
                return res.send('ok')
            }else {
                return  res.status(404).json(['Student with that id is not found'])
            }

        })
        .catch(err =>{
            // if validation error, that's a bad request -modify student id
            if (err instanceof db.sequelize.ValidationError){
                let messages =err.errors.map(e=>e.message)
                return res.status(400).json(messages)
            }else {
                return  next(err)
            }
        })
})

router.delete('/students/:id',function (req,res,next){
    let studentID=req.params.id

    Student.destroy({where:{id: studentID}})
        .then((rowsDeleted)=>{
            if (rowsDeleted===1){
                return res.send('ok')
            }else {
                return res.status(404).json(['Not found'])
            }

        }).catch(err => next(err))// unexpected errors
})
module.exports =router