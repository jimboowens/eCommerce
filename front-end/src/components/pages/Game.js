import React, { Component } from 'react';
import axios from 'axios';
import '../styles/game.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import updateCart from '../../actions/updateCart'

class Game extends Component{
    constructor(){
        super()
        this.state = {
            game: {},
        }
    }

    componentDidMount(){
        // console.log(this.props.match.params.id)
        const gid = this.props.match.params.id;
        const gameResponse = axios.get(`${window.apiHost}/games/${gid}`);
        gameResponse.then((response)=>{
            // console.log(response.data[0])
            const gameData = response.data[0]
            this.setState({
                game:gameData,
            })
        })

    }

    componentWillReceiveProps(newProps){
        // console.log(newProps)
        if (newProps.cart.length != this.props.cart.length){
            this.props.history.push('/?added=item')
        }
    }

    addToCart = (event)=>{
        console.log(this.props.auth.token)
        const token = this.props.auth.token
        this.props.updateCart(
            token,
            this.state.game.id
        )
    }

    render(){
        // console.log(this.state)
        let image = '';
        if (this.state.game.screenshot_url){
            image = this.state.game.screenshot_url.split(',')[0];
            image = image.replace('t_thumb','t_cover_big')
        }

        return(
            <div className="game-container">
                <div className="row">
                    <div className="col s12 m4">
                        <img src={image} alt="" className="game-pic" />
                    </div>
                    <div className="col s12 m8">
                        <div className="row">
                            <h3 className="game-title">{this.state.game.name}</h3>
                            <div className="game-desc">
                            {this.state.game.summary}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s1">
                                {/* <span>Qty: {this.state.game.quantity}</span> */}
                                <span>Qty: 0</span>
                            </div>
                            <div className="col s8">
                                <input type="text" name="quantity"/>
                            </div>
                            <div className="col s2">
                                <button onClick={this.addToCart}>ADD TO CART</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        auth: state.auth,
        cart: state.cart,
    }
}
function mapDispatchToProps(dispatcher){
    return bindActionCreators({
        updateCart,
    },dispatcher)
}

export default connect(mapStateToProps,mapDispatchToProps)(Game);