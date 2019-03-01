export default (state=[],action)=>{
    // signature takes state and action (signature is the stuff passed into a function set as a parameter)
    switch (action.type) {
        // console.log("payload is: ",action.payload)
        // console.log("data is: ",action.payload.data) 
        case 'UPDATE_CART':
		case 'GET_CART':
            return action.payload.data;
        default:
            return state;
    }
}