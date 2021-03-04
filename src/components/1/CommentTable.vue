<template>
  <div id="q-app">
    <div class="q-pa-sm q-gutter-sm">
      <q-table title="Коментарии" :data="getRows1" :columns="getColumns1" >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="comment" :props="props">
              <q-input type="textarea" v-model="props.row.comment" dense autofocus r></q-input>
            </q-td>
            <q-td key="score" :props="props">
              <q-input type="number" v-model="props.row.score" dense autofocus></q-input>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>

  import {mapGetters} from "vuex";

  export default {
    computed:{
      ...mapGetters('comment',['getColumns1','getRows1','getDefaultItem1','getEditedIndex1','getEditedItem1'])
    },
    methods: {
      addRow() {
        this.$store.commit('comment/addRow1',{'editedIndex':this.getEditedIndex1,'editedItem':this.getEditedItem1})
        this.close()
      },
      deleteItem(item) {
        confirm("Вы уверены что хотите удалить строку") && this.$store.commit('comment/deleteItem1',item)
      },
      editItem(item) {
        this.$store.commit('comment/editItem1',item)
        this.show_dialog = true;
      },
      close () {
        this.show_dialog = false
        setTimeout(() => {this.$store.commit('comment/setDefault1')}, 300)
      }
    },
    data() {
      return {
        separator: "cell",
        show_dialog: false,
      }
    }
  }
</script>
<style>
</style>
