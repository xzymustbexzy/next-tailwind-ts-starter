import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;

export const axiosNoAuth = axios.create();
