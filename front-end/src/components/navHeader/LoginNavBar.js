import React, { Component } from 'react';
import './Nav.css'

function LoginNavBar(props){
    // The process:
            // 1. User clicks and opens the new window via loginTab
            // 2. New window is open to crossOrigin but is github.com
            // 3. Once user authenticates, github sends them to /auth/github/callback
            // 4. The callback URL either gets the uid or inserts them
            // 5. Callback then takes the uid and tokenizes it with JWT
            // 6. Token is sent back to the github window that loginTab opened and
                // window.opener.postMessage is in the script of that window which
                // sends the data back over to original page
            // 7. It's now available in this promise resolution
            // 8. Put it in localstorage so we can use it next time.
    return(
        <div className="login-nav-bar">
            <div className="left valign-wrapper">WELCOME TO GAME WORLD</div>
            <div className="right">
                <button type="submit" class="btn play-button btn-github waves-effect grey darken-2">Login with github</button>
                <button type="submit" class="btn play-button waves-effect grey darken-2">MY CART 0 ITEM - $0.00</button>
            </div>
        </div>
    )
}
export default LoginNavBar;