import axios from 'axios';

export const setHeader = (key) => {
    axios.defaults.headers.common['Authorization'] = key
};

export default axios;