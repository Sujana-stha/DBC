
import axios, {getHeaders} from './axiosInstance'

//GET ALL FFEDBACKS API
export function getFeedbacks() {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get(`/feedbacks`,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// ADD NEW FFEDBACKS API
export function addFeedbacks(values) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.post('/feedbacks', values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

//DELETE FFEDBACKS API
export function deleteFeedbacks(feedbackId) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.delete('/feedbacks/'+ feedbackId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// UPDATE FFEDBACKS API
export function updateFeedbacks(feedbackId, values) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.put('/feedbacks/'+ feedbackId, values,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

// GET SINGLE DATA OF FFEDBACKS
export function getSingleFeedbacks (feedbackId) {
    const access_token = window.localStorage.getItem('access_token')
    const headers = getHeaders(access_token)
    return axios.get('/feedbacks/'+feedbackId,{headers})
    .catch(error=> {
        console.log(error)
        return {
            errors: error
        }
    });
}

