import api from "src/api/api";

export default {
    async deleteUser(context,user){
      try{
        const res = await api.deleteUser(user)
        const data = res.data
        context.commit("deleteUser",user.id)
        return true
      }catch (e) {
        if(e.response.status == 403){
          throw "У вас нет доступа или залогинтесь опять"
        }
        throw e.response.data

      }
    },
  async getUsers(context){
    try{
      const res = await api.getUsers()
      const data = res.data
      context.commit("setUsers",data)
      return true
    }catch (e) {
      if(e.response.status == 403){
        throw "У вас нет доступа или залогинтесь опять"
      }
      throw e.response.data

    }
  },
  async registrationUser(context,user){
    try{
      const res = await api.registrationUser(user)
      const data = res.data
      context.commit("addUser",data)
      context.commit("setDefaultEditedUser")
      return true
    }catch (e) {
      if(e.response.status == 403){
        throw "У вас нет доступа или залогинтесь опять"
      }
      throw e.response.data.message

    }
  },
  async editUser(context,user){
    try{
      const res = await api.editUser(user)
      const data = res.data
      let index = -1;
      for(let i=0;i< context.state.users.length;i++){
        if(context.state.users[i].id == data.id){
          index = i;
        }
      }
      console.log(index)
      context.commit("editUser",{index:index,user:data})
      context.commit("setDefaultEditedUser")
      return true
    }catch (e) {
      console.error(e)
      if(e.response.status == 403){
        throw "У вас нет доступа или залогинтесь опять"
      }
      throw e.response.data.message

    }
  },
  async resetPassword(context,user){
    try{
      const res = await api.resetPassword(user)
      const data = res.data
      let index = -1;
      for(let i=0;i< context.state.users.length;i++){
        if(context.state.users[i].id == data.id){
          index = i;
        }
      }
      console.log(index)
      context.commit("editUser",{index:index,user:data})
      context.commit("setDefaultEditedUser")
      return true
    }catch (e) {
      console.error(e)
      if(e.response.status == 403){
        throw "У вас нет доступа или залогинтесь опять"
      }
      throw e.response.data.message

    }
  },
}

