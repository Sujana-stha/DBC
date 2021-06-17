
import axios, {getHeaders} from './axiosInstance'

//GET ALL Profile API
export function getProfile() {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get(`/profile`,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}


// GET SINGLE DATA OF Profile
export function getSingleProfile (profileId) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get('/profile/'+profileId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

//DELETE PROFILE API
export function deleteProfile(profileId) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.delete('/profile/'+ profileId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}
