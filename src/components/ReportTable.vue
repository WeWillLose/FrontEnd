<template>
  <div>
    <progress-exam-table/>
    <progress-table/>
    <comment-table/>
    <creation-table/>
    <proective-table/>
    <class-rooms-table/>
    <programs-table/>
  </div>
</template>

<script>
  import ProgressExamTable from "components/1/ProgressExamTable";
  import ProgressTable from "components/1/ProgressTable";
  import CreationTable from "components/2/CreationTable";
  import CommentTable from "components/1/CommentTable";
  import ProectiveTable from "components/2/ProectiveTable";
  import ClassRoomsTable from "components/3/ClassRoomsTable";
  import ProgramsTable from "components/3/ProgramsTable";
  import {mapGetters} from "vuex";
  import api from "src/api/api";

  export default {
    components: {ProectiveTable, CommentTable, CreationTable, ProgressTable, ProgressExamTable, ClassRoomsTable, ProgramsTable},
    computed:{
      ...mapGetters({
        comment: "comment/getData",
        progress:'progress/getData',
        progress_exam:'progress_exam/getData',
      })
    },
    methods: {
      saveToServer(){
       api.sendDocxFiles(Object.assign({},this.comment,this.progress,this.progress_exam))
      },
    },

  }
</script>

<style scoped>

</style>
