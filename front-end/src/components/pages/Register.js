import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import authAction from '../../actions/authAction'
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css'

class Register extends Component{
    constructor(){
        super();
        this.state={
            msg:"",
            showAlert:false,
        }
    }

   
    componentWillReceiveProps(newProps){
        // console.log(newProps);
            if(newProps.auth.msg === 'user exists'){
                this.setState({
                    showAlert:true,
                })
            }else if (newProps.auth.msg ==="user added"){
                this.props.history.push('/')
            }
    
    }

    registerSubmit= (event)=>{
        event.preventDefault();
        // console.dir(event.target);
        const username = event.target[0].value
        // const username = document.getElementById('email').value
        const password = event.target[1].value
        // console.log(username,password)
        this.props.authAction({
            username,password
        })
    }

    render(){
        return(
        <main>
            <SweetAlert
               show={this.state.showAlert}
               title="Registration Error"
               text="Email is already registered. Login or chooose a different email."
               onConfirm={() => this.setState({ showAlert: false })}
           />
            <center>
            <div className="container">
                <div className="z-depth-1 grey lighten-4 row register">
                <form className="col s12" onSubmit={this.registerSubmit}>
                    <div className='row'>
                        <div className='col s12'></div>
                    </div>
                    <div className='row'>
                        <div className='input-field col s12'>
                            <input className='validate' type='email' name='email' id='email' />
                            <label htmlFor='email'>Please enter your email</label>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='input-field col s12'>
                            <input className='validate' type='password' name='password' id='password' />
                            <label htmlFor='password'>Please enter your password</label>
                        </div>
                        <label>
                            <Link className='red-text' to='/forgotPassword'><b>Forgot Password?</b></Link>
                        </label>
                    </div>
                    <br />
                    <center>
                    <div className='row'>
                        <button type='submit' name='btn_register' className='col s12 btn btn-large waves-effect grey'>Register</button>
                    </div>
                    </center>
                </form>
                </div>
            </div>
            <Link to="/register">Create account</Link>
            </center>
            <div className="section"></div>
            <div className="section"></div> 
        </main>
        )
    }
}

function mapStateToProps(state){
    // state = rootReducer/store
    return({
        // key = this.props.key will be accessible to this component
        // which is to say the key in the following key value pair(s) will be this.props.(key)
        // value = property of rootReducer
        auth: state.auth,
    })
}

function mapDispatchToProps(dispatcher){
    // dispatch is the thing that sends the action to all reducers
    return(bindActionCreators({
        authAction:authAction,
    },dispatcher))
}

// export default Register;
export default connect(mapStateToProps,mapDispatchToProps)(Register)