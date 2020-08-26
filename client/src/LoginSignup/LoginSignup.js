import React, { Component } from 'react'
import CSS from './LoginSignup.module.scss'
import axios from 'axios';

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
            this.props.logInSwitch();
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
                  this.props.showAllDidits();
                  this.props.logInSwitch();
                  }
                )
              }
            )
            .catch(err => {
              this.setState({errorMessage: err.response.data.data[0].msg})
            })
          };

        render() {
          localStorage.clear();
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

export default LoginSignup;