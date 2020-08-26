import React, { Component } from 'react'
import CSS from './AddADidit.module.scss'
import axios from 'axios';

class AddADidit extends Component {
        constructor(props){
          super(props);
          this.state = {
              newDidit:"",
              message:""
          }

          this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
        }

        componentDidMount(){
          axios.get('/is-connected',
          {headers: {
                Authorization: 'Bearer '+ localStorage.getItem('token') + ' ' + localStorage.getItem('refrToken')
             }})
         .then(res => {
          if(res.data.token){
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('refrToken', res.data.refrToken);
          }
         })
         .catch(err=>{
              console.log('not connected server doesnt see good tokens')
              console.log(err)
              console.log(err.response.data.message);
              this.props.goToLogin();
         })
     }
        handleTextAreaChange(event) {
            const target = event.target;
            const value = target.value;
            const name = target.name;
            if(this.state.message){
              this.setState({message:""})

            }
            this.setState({
              [name]: value
            });
          }

        handleSubmit = e =>{
          e.preventDefault();
          const data = {text: this.state.newDidit, userId: localStorage.getItem('userId')};
          axios
          .post('/post-new-didit', data,
          {headers: {
                Authorization: 'Bearer '+ localStorage.getItem('token') + ' ' + localStorage.getItem('refrToken')
             }})
          .then(
            res => {
              this.setState({ newDidit:""});
              this.setState({message: "Didit has been added."});
          })
          .catch(
            err => {
              this.setState({message: err.response.data.message})
              console.log("the error", err.response.data.message)
            })
        };

        render() {
          return (
            <form className={CSS.Form}>
                 <textarea
                    className={CSS.TextArea}
                    name="newDidit"
                    value={this.state.newDidit}
                    placeholder="Write..."
                    onChange={this.handleTextAreaChange} />
                <div className={CSS.SubmitButton}
                    onClick={this.handleSubmit}> addit
                </div>
                <div className={CSS.ErrorMessage}>{this.state.message}</div>
             </form>
          );
        }
      }

export default AddADidit;
