
import axios, {getHeaders} from './axiosInstance'

//GET ALL OBJECTIVES API
export function getObjective() {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get(`/objective`,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// ADD NEW OBJECTIVES API
export function addObjective(values) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.post('/objective', values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

//DELETE OBJECTIVES API
export function deleteObjective(objectiveId) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.delete('/objective/'+ objectiveId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// UPDATE OBJECTIVES API
export function updateObjective(objectiveId, values) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.put('/objective/'+ objectiveId, values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// GET SINGLE DATA OF OBJECTIVES
export function getSingleObjective (objectiveId) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get('/objective/'+objectiveId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

