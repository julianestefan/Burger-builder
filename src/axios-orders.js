import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://burger-builder-efa3a.firebaseio.com/'
});

export default instance;