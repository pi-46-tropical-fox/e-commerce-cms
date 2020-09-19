import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://e-commerce-cms-bdh8.herokuapp.com',
});

export default instance;
