import axios from 'axios';

export default (formData)=>{
    console.log("formData is: ",formData)
    const axiosPromise = axios({
        url:`${window.apiHost}/search`,
        method:'POST',
        data:formData,
    })
    return{
        type:"SEARCH_ACTION",
        payload:axiosPromise,
    }
}