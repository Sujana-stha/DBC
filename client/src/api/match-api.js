
import axios, {getHeaders} from './axiosInstance'

//GET ALL USERS API
export function getMatchs() {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get(`/meet/all`,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}


//DELETE USERS API
export function deleteMatchs(matchId) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.delete('/meet/'+ matchId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

