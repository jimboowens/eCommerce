import axios from 'axios';

export default function(token){
	console.log('got to cartAction')
	var thePromise = axios({
		method: "POST",
		url: `${window.apiHost}/cart/getCart`,
		data: {
			token,
		}
	});

	return{
		type: "GET_CART",
		payload: thePromise,
	}

}