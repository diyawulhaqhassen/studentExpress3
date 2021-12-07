<template>
  <div id="app">
    <new-student-form v-on:student-added="newStudentAdded"></new-student-form>
    <student-table v-bind:students="students"
                   v-on:student-present="studentArrivedOrLeft"
                   v-on:delete-student="studentDeleted"
    ></student-table>
    <student-message v-bind:student="mostRecentStudent"></student-message>
    </div>
</template>


<script>
import NewStudentForm from './components/NewStudentForm.vue'
import StudentMessage from './components/StudentMessage.vue'
import StudentTable from './components/StudentTable.vue'




// import NewStudentForm from "@/components/NewStudentForm";
// import StudentTable from "@/components/StudentTable";
// import StudentMessage from "@/components/StudentMessage";

export default {
  data(){
    return{
      students:[],
      mostRecentStudent:{}
    }
  },
  name: 'App',
  emits:['student-added'],
  components: {
    StudentMessage,
    StudentTable,
    NewStudentForm,

  },
mounted() {
    this.updateStudents()
    // load all students make request to API
},
  methods:{
    updateStudents(){
      this.$student_api.getAllStudents().then(students=>{
        this.students=students
      })
    },
    newStudentAdded(student){
    this.$student_api.addStudent(student).then( ()=>{
      this.updateStudents()
    }).catch(err =>{
      let msg =err.response.data.join(',')
      alert('Error adding student,\n'+msg)
    })
    },
    studentArrivedOrLeft(student,present){
      student.present=present//update present value
    this.$student_api.updateStudent(student).then(()=>{
      this.mostRecentStudent=student
      this.updateStudents()
    })


    },
    studentDeleted(student){
    this.$student_api.deleteStudent(student.id).then( ()=>{
      this.updateStudents()
      this.mostRecentStudent={}
    })

    }
  }
}
</script>

<style>

@import "https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css";
#app {


}
</style>
