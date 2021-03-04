<template>
  <div id="q-app">
    <q-page class="bg_gradient flex full-height">
      <div class="q-pa-sm q-gutter-sm full-width" >
        <q-table :data="getUsers" :columns="columns" class="q-mx-auto" style="max-width: 80%;min-width: 60%">
          <template v-slot:top-right>
            <q-btn @click="showNewUserDialog(true)">Add User</q-btn>
          <div class="q-pa-sm q-gutter-sm">
            <q-dialog v-model="new_user_dialog">
              <q-card class="add-row-dialog">
                <q-card-section>
                  <div class="text-h6">Добавить Пользователя</div>
                </q-card-section>
                <q-card-section class="">
                  <div class="row q-gutter-md q-ma-md">
                    <q-input  type="text" label="Логин" v-model="geEditedUser.username"></q-input>
                    <q-input  v-if="show_password" type="text" label="Пароль" v-model="geEditedUser.password"></q-input>
                    <q-input  type="text" label="Имя" v-model="geEditedUser.firstName"></q-input>
                    <q-input  type="text" label="Фамилия" v-model="geEditedUser.lastName"></q-input>
                  </div>
                </q-card-section>
                <q-card-actions align="right">
                  <q-btn flat label="OK" color="primary" v-close-popup @click="addRow" ></q-btn>
                </q-card-actions>
              </q-card>
            </q-dialog>

            <q-dialog v-model="edit_user_dialog">
              <q-card class="add-row-dialog">
                <q-card-section>
                  <div class="text-h6">Изменить Пользователя</div>
                </q-card-section>
                <q-card-section class="">
                  <div class="row q-gutter-md q-ma-md">
                    <q-input  v-model="geEditedUser.id" class="hidden" readonly></q-input>
                    <q-input  type="text" label="Логин" v-model="geEditedUser.username"></q-input>
                    <q-input  type="text" label="Имя" v-model="geEditedUser.firstName"></q-input>
                    <q-input  type="text" label="Фамилия" v-model="geEditedUser.lastName"></q-input>
                  </div>
                </q-card-section>
                <q-card-actions align="right">
                  <q-btn flat label="OK" color="primary" v-close-popup @click="editUser" ></q-btn>
                </q-card-actions>
              </q-card>
            </q-dialog>

            <q-dialog v-model="reset_password_dialog">
              <q-card class="add-row-dialog">
                <q-card-section>
                  <div class="text-h6">Изменить Пользователя</div>
                </q-card-section>
                <q-card-section class="">
                  <div class="row q-gutter-md q-ma-md">
                    <q-input  v-model="geEditedUser.id" class="hidden" readonly></q-input>
                    <q-input  type="text" label="Пароль" v-model="geEditedUser.password"></q-input>
                  </div>
                </q-card-section>
                <q-card-actions align="right">
                  <q-btn flat label="OK" color="primary" v-close-popup @click="resetPassword" ></q-btn>
                </q-card-actions>
              </q-card>
            </q-dialog>

          </div>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="id" :props="props">
                <q-input  v-model="props.row.id" class="hidden" readonly></q-input>
              </q-td>
              <q-td key="username" :props="props">
                <q-input type="text" v-model="props.row.username" dense autofocus></q-input>
              </q-td>
              <q-td key="firstName" :props="props">
                <q-input type="text" v-model="props.row.firstName" dense autofocus></q-input>
              </q-td>
              <q-td key="lastName" :props="props">
                <q-input type="text" v-model="props.row.lastName" dense autofocus></q-input>
              </q-td>
              <q-td key="actions" :props="props" auto-width>
                <q-btn color="blue" label="Изменить данные" @click="showEditUserDialog(props.row)" size=sm no-caps></q-btn>
                <q-btn color="blue" label="Сбросить пароль" @click="showResetPasswordDialog(props.row)" size=sm no-caps></q-btn>
                <q-btn color="red" label="Удалить" @click="deleteUser(props.row)" size=sm no-caps></q-btn>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </q-page>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import api from "src/api/api";
  import notifyApi from "src/api/notifyApi";

  export default {
    name: "Admin",
    data() {
      return {
        new_user_dialog:false,
        edit_user_dialog:false,
        reset_password_dialog:false,
        show_password:false,
        columns: [
          {
            name: "username",
            required: true,
            label: "Логин",
            align: "left",
            field: "comment"
          },
          {
            name: "firstName",
            align: "center",
            label: "Имя",
            field: "score",
          },
          {
            name: "lastName",
            align: "center",
            label: "Фамилия",
            field: "lastName",
          },
          {
            name: "actions",
            align: "center",
            label: "Действия",
            field: "actions",
            style: "width:100px"
          },
        ]
      }
    },
    computed:{
     ...mapGetters('admin_table',['getUsers','geEditedUser'])
    },
    methods:{
      deleteUser(user){
        this.$store.dispatch('admin_table/deleteUser',user).catch(e=>
        {
          this.$q.notify({type:"negative",message:e})
        })
      },
      showNewUserDialog(show_password){
        this.show_password = show_password;
        this.new_user_dialog = true;
      },
      showResetPasswordDialog(user){
        this.reset_password_dialog = true;
        this.$store.commit('admin_table/setEditedUser',{
          id:user.id,
          password:user.password,
        })
      },
      showEditUserDialog(user){
        this.$store.commit('admin_table/setEditedUser',{
          id:user.id,
          username:user.username,
          firstName:user.firstName,
          lastName:user.lastName,
        })
        this.edit_user_dialog = true;
      },
      addRow(){
        this.$store.dispatch('admin_table/registrationUser',this.geEditedUser).catch(t=>notifyApi.showErrorNotify(t))
        this.show_password = false;
      },
      editUser(){
        this.$store.dispatch('admin_table/editUser',this.geEditedUser).catch(t=>notifyApi.showErrorNotify(t))
      },
      resetPassword(){
        this.$store.dispatch('admin_table/resetPassword',this.geEditedUser).catch(t=>notifyApi.showErrorNotify(t))
      }
    },
    beforeCreate(){
      this.$store.dispatch("admin_table/getUsers").catch(e=>
      {
        this.$q.notify({type:"negative",message:e})
      })
    },

  }
</script>

<style scoped>

</style>
