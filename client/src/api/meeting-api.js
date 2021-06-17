
import axios, {getHeaders} from './axiosInstance'

//GET ALL USERS API
export function getMeetings() {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get(`/meetings`,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}


//DELETE USERS API
export function deleteMeetings(meetingId) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.delete('/meetings/'+ meetingId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

