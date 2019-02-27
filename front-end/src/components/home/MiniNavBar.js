import React, { Component } from 'react';

class MiniNavBar extends Component{
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
                    <a href="#!" className="brand-logo center">Logo</a>
                    <ul className="left hide-on-med-and-down">
                        <li><a href="sass.html">Sass</a></li>
                        <li><a href="badges.html">Components</a></li>
                        <li className="active"><a href="collapsible.html">JavaScript</a></li>
                    </ul>
                </div>
          </nav>
        )
    }
}

export default MiniNavBar;