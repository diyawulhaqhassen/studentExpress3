
module.exports=(sequelize, DataTypes)=> {
    let Student=sequelize.define('Student',{

        name:{
            type: DataTypes.STRING,// _TYPE
            allowNull:false
        },
        starID:{
            type: DataTypes.STRING,
            allowNull:false,
            unique:true,
            validate:{
                is:/^[a-z]{2}\d{4}[a-z]{2}$/
                // regular expression to match the pattern of a star id
                // to lower case letters a-Z,four digits, to lowercase letters a-z
            }
        },
        present:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false
        }
    })

    //force specifies wheter to drop the table or not
    // true=drop table every time app restarts.Need this setting if table schema changed
    //false=keep table

    Student.sync({force: false}).then(()=>{
        console.log('synced student table')
    })

    return Student
}