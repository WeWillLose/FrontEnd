import axios from 'axios'

const resource = axios.create({
})

export default {
  sendDocxFiles: files =>resource.post('/api/api/v1/docx/',files),
  getform: () =>resource.get('/api/api/form'),
  getToDo: () => resource.get('/api/api/toDo/author/current/'),
  updateToDo: (item) => resource.put(`/api/api/toDo/edit/${item.id}/`, item),
  deleteToDo: (item) => resource.post(`/api/api/toDo/delete/${item.id}/`),
  createToDo: (item) => resource.post(`/api/api/toDo/create/`,item),
  login: (user) => resource.post(`/api/auth/login/`,user),
  deleteUser: (user) => resource.delete(`/api/api/user/${user.id}`),
  getUsers: () => resource.get(`/api/api/user/all`),
  registrationUser: (user) => resource.post(`/api/auth/registration`,user),
  editUser: (user) => resource.put(`/api/api/user/info/${user.id}`,user),
  resetPassword: (user) => resource.put(`/api/api/user/password/${user.id}`,user),
}

