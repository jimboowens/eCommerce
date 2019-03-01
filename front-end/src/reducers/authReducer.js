// a reducer is a function that returns a piece of state
// to the root reducer, which in turn goes to the store and updates 
// the DOM and various files accordingly
// This reducer takes care of the authorization state (token)
// if you want to change me, let me know by an action.type

export default (state=[],action)=>{
    
    // signature takes state and action (signature is the stuff passed into a function set as a parameter)
    switch (action.type) {
        case "AUTH_ACTION":
        case "LOGIN_ACTION":
        case "SEARCH_ACTION":
            return action.payload.data;
        case "LOGOUT":
            return [];
        default:
            return state;
    }
}
    
