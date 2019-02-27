import React, { Component } from 'react';

class MainNav extends Component{
    render(){
        return(
            <div className="main-nav">
                <nav>
                    <div className="nav-wrapper grey darken-4">
                        <ul className="left hide-on-med-and-down">
                            <li className="active"><a href="sass.html">Sass</a></li>
                            <li className="active"><a href="badges.html">Components</a></li>
                            <li className="active"><a href="collapsible.html">JavaScript</a></li>
                        </ul>
                    </div>
            </nav>      

            </div>
        )
    }
}
export default MainNav;