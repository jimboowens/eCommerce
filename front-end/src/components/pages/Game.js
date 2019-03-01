import React, { Component } from 'react';
import axios from 'axios';
import '../styles/game.css';

class Game extends Component{
    constructor(){
        super()
        this.state = {
            game: [],
            quantity:0,
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
                                <span>Qty: {this.state.game.quantity}</span>
                            </div>
                            <div className="col s8">
                                <input type="text" name="quantity"/>
                            </div>
                            <div className="col s2">
                                <button>ADD TO CART</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Game;