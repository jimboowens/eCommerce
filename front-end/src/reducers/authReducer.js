// a reducer is a function that returns a piece of state
// to the root reducer, which in turn goes to the store and updates 
// the DOM and various files accordingly
// This reducer takes care of the authorization state (token)
// if you want to change me, let me know by an action.type

export default (state=[],action)=>{
    // signature takes state and action (signature is the stuff passed into a function set as a parameter)
    if (action.type ==="AUTH_ACTION"||action.type ==="LOGIN_ACTION" || action.type ==="SEARCH_ACTION") {
        console.log("payload is: ",action.payload)
        // console.log("data is: ",action.payload.data) 
        return action.payload.data
    }
    else if(action.type === "LOGOUT") return [];
    else return state;
    
}