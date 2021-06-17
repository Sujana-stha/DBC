import axios from 'axios';
const base_url = `http://localhost:3003`
const access_token = window.localStorage.getItem('access_token')
const axiosInstance = axios.create ({
    baseURL: base_url,
    headers: {'Authorization':`${access_token}`, 'X-Requested-With': 'XMLHttpRequest'}
})

export const getHeaders = ()=> {
    const access_token = window.localStorage.getItem('access_token')
    return {
        Authorization: `${access_token}`
    }
}
export default axiosInstance;
