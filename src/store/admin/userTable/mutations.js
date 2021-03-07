export default {
  deleteUser(state,index){
    try{
      state.users.splice(index, 1);
    }catch (e) {
      console.error(e)
    }
  },
  setUsers(state,users){
    try{
      state.users = users
    }catch (e) {
      console.error(e)
    }
  },
  addUser(state,user){
    try{
      state.users.push(user)
    }catch (e) {
      console.error(e)
    }
  },
  editUser(state,data){
    try{
      Object.assign(state.users[data.index], data.user);
    }catch (e) {
      console.error(e)
    }
  },
  setDefaultEditedUser(state){
    try{
      Object.assign(state.editedUser, state.defaultUser)
    }catch (e) {
      console.error(e)
    }
  },
  setEditedUser(state,user){
    try{
      if(!user){
        this.setDefaultEditedUser()
      }
      state.editedUser = user
    }catch (e) {
      console.error(e)
    }
  }

}

