import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class MiniNavBar extends Component{
    constructor(){
        super()

    }
    render(){
        // const cats = [
        //     'NES',
        //     'DREAMCAST',
        //     'N64',
        //     'PLAYSTATION',
        //     'ATARI',
        //     'XBOX',
        // ]
        return(
            <nav>
                <div className="nav-wrapper grey darken-4">
                    <Link to="/" className="brand-logo center">Logo</Link>
                    <ul className="left hide-on-med-and-down">
                        <Link to="sass.html">Sass</Link>
                        <Link to="badges.html">Components</Link>
                        <Link className="active" to="collapsible.html">JavaScript</Link>
                    </ul>
                </div>
          </nav>
        )
    }
}

export default MiniNavBar;