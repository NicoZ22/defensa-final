import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:3000'
});

const tablas = ['dueños','socios','empleados','disciplinas'];
export const apiService = {};

tablas.forEach((tabla) => {
  apiService[tabla] = {
    getAll: async () => {
      const response = await api.get(`/${tabla}`);
      return response.data;
    },
    getId: async (id) => {
      const response = await api.get(`/${tabla}/${id}`);
      return response.data;
    },
    create: async (data) => {
      const response = await api.post(`/${tabla}`, data);
      return response.data;
    },
    update: async (id, data) => {
      const response = await api.put(`/${tabla}/${id}`, data)
      return response.data;
    },
    delete: async (id) => {
      const response = await api.delete(`/${tabla}/${id}`)
      return response.data;
    },
  };
});