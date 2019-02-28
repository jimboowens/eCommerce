import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Nav.css'
import loginTab from '../../misc/OpenWindow';
import {connect} from 'react-redux';
 // The process: (will be enumerated to come)
let rightNavBar = <br></br>;
class LoginNavBar extends Component{
    constructor(){
        super()
    }

    githubAuth = ()=>{
        // 1. User clicks and opens the new window via loginTab
        // 2. New window is open to crossOrigin but is github.com
        loginTab(`http://localhost:3000/auth/github`)
    }
         
            // 3. Once user authenticates, github sends them to /auth/github/callback
            // 4. The callback URL either gets the uid or inserts them
            // 5. Callback then takes the uid and tokenizes it with JWT
            // 6. Token is sent back to the github window that loginTab opened and
                // window.opener.postMessage is in the script of that window which
                // sends the data back over to original page
            // 7. It's now available in this promise resolution
            // 8. Put it in localstorage so we can use it next time.

    render(){
        // console.log(this.props.auth)
        if(this.props.auth.username !== undefined){
            // then user is logged in
            rightNavBar=<span>welcome, {this.props.auth.username}</span>
        } else{
            rightNavBar=
            <span>
                <Link to="/login">Sign in</Link> or <Link to="/register">Register</Link>
                <button type="button" onClick={this.githubAuth}   className="btn play-button btn-github waves-effect grey darken-2">Login with github</button>
                <button type="submit" className="btn play-button waves-effect grey darken-2" href="cart">MY CART 0 ITEM - $0.00</button>
            </span>
        }
        return(
        <div className="login-nav-bar">
            <div className="left valign-wrapper">
                WELCOME TO : <Link to="/"> ZAPP GAMES</Link>
            </div>
            <div className="right">
                {rightNavBar}
            </div>
        </div>
        )
    }
}

function mapStateToProps(state){
    return({
        auth:state.auth,
    })
}

export default connect(mapStateToProps)(LoginNavBar)
// export default LoginNavBar;