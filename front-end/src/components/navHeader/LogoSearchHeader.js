import React, { Component } from 'react';

class LogoSearchHeader extends Component{
    render(){
        return(
            <div className="logo-search-header">
                <div className="left-align">
                    <img src="/images/zapp.jpg" alt=""/>
                </div>
                <div className="right-align">
                    <input type="text" placeholder="Search" />
                </div>            
            </div>
        )
        }
}
export default LogoSearchHeader;