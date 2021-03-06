import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cartAction from '../../actions/cartAction';
import CartRow from '../utility/CartRow';
import axios from 'axios';

class Cart extends Component{
	constructor(){
		super();
		this.state={
			totalItems:[],
		}
	}

	makePayment=()=>{
        var handler = window.StripeCheckout.configure({
            key: 'pk_test_K9L17worNm0z7lHpdssTpwqr',
            locale: 'auto',
            image: 'http://www.digitalcrafts.com/sites/all/themes/digitalcrafts/images/digitalcrafts-site-logo.png',
            token: (token)=>{
            	console.log(token);
            	console.log(this.props.auth.token);
                var theData = {
                    amount: this.props.cart.totalPrice * 100, //  the total is in pennies
                    stripeToken: token.id,
                    userToken: this.props.auth.token,
                }
                axios({
                    method: 'POST',
                    url: `${window.apiHost}/stripe`,
                    data: theData
                }).then((response) => {
                    console.log(response);
                    if (response.data.msg === 'paymentSuccess') {
                    	this.props.history.push('/thankyou')
                    }else{
                    	console.log(response.data.msg)
                    }
                });
            }
        });
        handler.open({
            name: "Pay Now",
            description: 'Classic Models order',
            amount: this.props.cart.totalPrice * 100 //the total is in pennies
        })
    }

	componentDidMount(){
		console.log(this.props.auth);
		if(this.props.auth.token === undefined){
			// if the user has no token... they should not be here. Goodbye.
			this.props.history.push('/login')
		}else{
			// the user does have a token, go get their cart!
			this.props.cartAction(this.props.auth.token);
		}
	}

	render(){
		console.log(this.props.cart);
		if(!this.props.cart.items){
			// if this return occurs, the render is DONE
			return(
				<div className="cartBody">
					<h3>Your cart is empty. Click add to cart in any game page to fill your cart.</h3>
				</div>
			)
		}else{
			var cartArray = this.props.cart.contents.map((product,index)=>{
				// console.log(product)
				return (
						<CartRow key={index} product={product}></CartRow>
				)
			})
			return(
				<div>
					<h2>Your order total is: ${this.props.cart.total} - <button className="btn btn-primary" onClick={this.makePayment}>Proceed to Checkout</button></h2>
					<table className="table table-striped">
						<thead>
							<tr>
								<th>Product</th>
								<th>Price</th>
								<th>Remove</th>
							</tr>
						</thead>
						<tbody>
							{cartArray}
						</tbody>
						{/* <tfoot>
							<div>
								<tr>Proceed to Checkout</tr>
								<tr><button className="btn btn-primary" onClick=""></button></tr>
							</div>
						</tfoot> */}
					</table>
				</div> 	 
			)
		}
	}
}

function mapStateToProps(state){
	return{
		auth: state.auth,
		cart: state.cart,
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		cartAction: cartAction,
	},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart);



