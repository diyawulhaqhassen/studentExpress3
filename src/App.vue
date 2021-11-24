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
  name: 'App',
  emits:['student-added'],
  components: {
    StudentMessage,
    StudentTable,
    NewStudentForm,

  },
  data(){
    return{
      students:[],
      mostRecentStudent:{}
    }
  },
  methods:{
    newStudentAdded(student){
      this.students.push(student)
      this.students.sort(function (s1,s2){
        return s1.name.toLowerCase()<s2.name.toLowerCase()?-1:1
      })

    },
    studentArrivedOrLeft(student,present){
      //find student in this.students,set present vale
      //return undefined in no match
      let updateStudent=this.students.find(function (s) {
        if(s.name===student.name&&s.starID===student.starID){
          return true;
        }
      })
      if(updateStudent){
        updateStudent.present=present
        this.mostRecentStudent=student
      }
    },
    studentDeleted(student){
      // filter returns a new array of all students for whom the function return true
      this.students=this.students.filter(function (s){
        if (s !=student){
          return true
        }
      })

      // CLEAR welcome /goodbye
      this.mostRecentStudent={}
    }
  }
}
</script>

<style>

@import "https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css";
#app {


}
</style>
