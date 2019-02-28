import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import searchAction from '../../actions/searchAction'

class LogoSearchHeader extends Component{
    constructor(){
        super()
        this.state = {
            msg:"",
            searchCriteria:"",
            searchResults:"",
        }
    }

    searchSubmit=(event)=>{
        event.preventDefault()
        console.log(event.target[0].value)
        const searchCriteria = event.target[0].value
        this.props.searchAction({
            searchCriteria,
        })
    }

    render(){
        return(
            <div className="logo-search-header">
                <div className="left-align">
                    <img src="/images/zapp.jpg" alt=""/>
                </div>
                <div className="right-align">
                    <form onSubmit={this.searchSubmit}>
                        <input type="text" placeholder="Search" />
                    </form>
                </div>            
            </div>
        )
        }
}

function mapStateToProps(state){
    return({
        search:state.searchCriteria
    })
}

function mapDispatchToProps(dispatcher){
    return (bindActionCreators(({
        searchAction:searchAction,
    }),dispatcher))
}

export default connect(mapStateToProps,mapDispatchToProps)(LogoSearchHeader)
// export default LogoSearchHeader;