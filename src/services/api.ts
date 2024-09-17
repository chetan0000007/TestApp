import axios from 'axios';

const api = axios.create({
  baseURL: 'https://reqres.in/api',
});

export const fetchUsers = async (page: number = 1) => {
  try {
    const response = await api.get(`/users?page=${page}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
