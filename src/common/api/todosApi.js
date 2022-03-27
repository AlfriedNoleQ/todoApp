import axiosCilent from '../api/axiosCilent'

const getAll = () => {
  return axiosCilent.get("/todos");
};

const get = id => {
  return axiosCilent.get(`/todos/${id}`);
};

const create = data => {
  return axiosCilent.post("/todos", data);
};

const update = (id, data) => {
  return axiosCilent.put(`/todos/${id}`, data);
};

const remove = id => {
  return axiosCilent.delete(`/todos/${id}`);
};

const todoService = {
  getAll,
  get,
  create,
  update,
  remove
};
export default todoService;