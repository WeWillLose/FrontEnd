<template>
  <div id="q-app">
    <div class="q-pa-sm q-gutter-sm">
      <q-table title="Сохранение учебно-материальной базы, поддержание надлежащих санитарно-гигиенических условий" :hide-no-data="true" :data="getRows1" :columns="getColumns1">
        <template v-slot:top-right>
          <div>
            <q-btn dense color="secondary" label="Добавить строку" @click="show_dialog = true" no-caps ></q-btn>
          </div>
          <div class="q-pa-sm q-gutter-sm">
            <q-dialog v-model="show_dialog">
              <q-card class="add-row-dialog">
                <q-card-section>
                  <div class="text-h6">Добавить строку</div>
                </q-card-section>

                <q-card-section class="">
                  <div class="row q-gutter-md q-ma-md">
                    <q-input  type="text"clearable v-model="getEditedItem1.class" label="№ кабинета/лаборатории"></q-input>
                    <q-input  type="text" v-model="getEditedItem1.status" label="Характеристика состояния"></q-input>
                    <q-input  type="number" v-model="getEditedItem1.score" label="Баллы"></q-input>
                  </div>
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn flat label="OK" color="primary" v-close-popup @click="addRow" ></q-btn>
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>

        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="class" :props="props">
              <q-input type="number" v-model="props.row.class" dense autofocus></q-input>
            </q-td>
            <q-td key="status" :props="props">
              <q-input type="textarea" v-model="props.row.status" dense autofocus ></q-input>
            </q-td>
            <q-td key="score" :props="props">
              <q-input type="number" v-model="props.row.score" dense autofocus ></q-input>
            </q-td>
            <q-td key="actions" :props="props" auto-width>
              <!--                <q-btn color="blue" label="Update" @click="editItem(props.row)" size=sm no-caps></q-btn>-->
              <q-btn color="red" label="Delete"  @click="deleteItem(props.row)" size=sm no-caps></q-btn>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed:{
    ...mapGetters('class_rooms',['getColumns1','getRows1','getDefaultItem1','getEditedIndex1','getEditedItem1'])
  },
  methods: {
    addRow() {
      this.$store.commit('class_rooms/addRow1',{'editedIndex':this.getEditedIndex1,'editedItem':this.getEditedItem1})
      this.close()
      console.log(this.getRows1)
    },
    deleteItem(item) {
      confirm("Вы уверены что хотите удалить строку") && this.$store.commit('class_rooms/deleteItem1',item)
    },
    editItem(item) {
      this.$store.commit('class_rooms/editItem1',item)
      this.show_dialog = true;
    },
    close () {
      this.show_dialog = false
      setTimeout(() => {this.$store.commit('class_rooms/setDefault1')}, 300)
    }
  },
  data() {
    return {
      show_dialog: false,
    };
  }
}
</script>

<style scoped>

</style>
