import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-66203.firebaseio.com/'
});

export default instance;