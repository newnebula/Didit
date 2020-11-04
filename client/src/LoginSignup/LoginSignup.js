import React, { Component } from 'react'
import CSS from './LoginSignup.module.scss'
import axios from 'axios';
import {connect} from 'react-redux';
import { withRouter } from "react-router-dom";

class LoginSignup extends Component {
        constructor(props){
          super(props);
          this.state = {
              email: "",
              password:"",
              errorMessage: null
          }
          this.handleEmailPasswordChange = this.handleEmailPasswordChange.bind(this);
        }

        componentDidMount(){
            this.props.onLogout();
            localStorage.clear();
        }

        handleEmailPasswordChange(event) {
            const target = event.target;
            const value = target.value;
            const name = target.name;
            this.setState({
              [name]: value
            });
          }

        handleSubmitLogin = e =>{
          e.preventDefault();
          const data = {
            email: this.state.email,
            password: this.state.password
          };

          axios
          .post('/login', data)
          .then(res => {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('refrToken', res.data.refrToken);
            localStorage.setItem('userId', res.data.userId);
            this.props.onLogin();
            this.props.history.push("/today");
          })
          .catch(err => {
            console.log(err)
            if(err.response){
            this.setState({errorMessage: err.response.data.message})
            }
          })
        };

        handleSubmitSignup = e =>{
            e.preventDefault();
            const data = {
              email: this.state.email,
              password: this.state.password
            };
            axios
            .post('/signup', data)
            .then(res => {
                axios
                .post('/login', data)
                .then(res => {
                  localStorage.setItem('token', res.data.token);
                  localStorage.setItem('userId', res.data.userId);
                  localStorage.setItem('refrToken', res.data.refrToken);
                  this.props.onLogin();
                  this.props.history.push("/today");
                  }
                )
              }
            )
            .catch(err => {
              this.setState({errorMessage: err.response.data.data[0].msg})
            })
          };

        render() {
          return (
            <form className={CSS.Form}>
                <input
                    className={CSS.TextArea}
                    name="email"
                    value={this.state.email}
                    placeholder="Your email"
                    onChange={this.handleEmailPasswordChange} />

                <input
                    className={CSS.TextArea}
                    type="password"
                    name="password"
                    value={this.state.password}
                    placeholder="Your password"
                    onChange={this.handleEmailPasswordChange} />

                <div className={CSS.ErrorMessage}>{this.state.errorMessage}</div>

                <div className={CSS.SubmitButton}
                    onClick={this.handleSubmitLogin}> login
                </div>
                <div className={CSS.SubmitButton}
                    onClick={this.handleSubmitSignup}> signup
                </div>
             </form>
          );
        }
      }

      const mapsStateToProps = state => {
        return{
          areWeLoggedIn: state.loggedIn
        }
      }

      const mapsDispatchToProps = dispatch => {
        return{
          onLogin: () => dispatch({type: 'LOGIN'}),
          onLogout: () => dispatch({type: 'LOGOUT'})
        }
      }

      export default withRouter(connect(mapsStateToProps, mapsDispatchToProps)(LoginSignup));