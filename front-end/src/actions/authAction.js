// an action is a js function that returns an object
// that object must have at least a property of type
import axios from 'axios';


export default (formData)=>{
    console.log('authAction is running',formData)
    const axiosPromise = axios({
        url:`${window.apiHost}/register`,
        method: 'POST',
        data:formData,
    })
    return({
        type:'AUTH_ACTION',
        payload:axiosPromise,
    })
}