export default {
  addRow1:(state,data) =>{
    console.log(data)
    if (data.editedIndex > -1) {
      Object.assign(state.rows[data.editedIndex], data.editedItem);
    } else {
      state.rows.push(data.editedItem);
    }
  },
  deleteItem1:(state,item) =>{
    const index = state.rows.indexOf(item);
    state.rows.splice(index, 1);
  },
  editItem1:(state,item) =>{
    state.editedIndex = state.rows.indexOf(item);
    state.editedItem = Object.assign({}, item);
  },
  setDefault1: (state) =>{
      state.editedItem = Object.assign({}, state.defaultItem)
      state.editedIndex = -1
  },
}

