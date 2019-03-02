import axios from 'axios';

export default (token,itemId)=>{
    console.log('got to update cart, token is:',token,"and itemId is:", itemId)
    const updateCartPromise = axios({
        method:'POST',
        url:`${window.apiHost}/cart/updateCart`,
        data:{
            token,
            itemId,
        }
    })
    return{
        type:`UPDATE_CART`,
        payload:updateCartPromise,
    }
}