// an action is a js function that returns an object
// that object must have at least a property of type



export default (formData)=>{
    console.log('authAction is running',formData)
    return({
        type:'AUTH_ACTION',
    })
}