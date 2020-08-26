import axios from 'axios';

const refrToken = (_refrToken) => {
    const data = {
        refrToken: _refrToken
      };
     axios
    .post('/refrToken', data)
    .then(res => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('refrToken', res.data.refrToken);
        localStorage.setItem('userId', res.data.userId);
        }
    )
    .catch(err =>{
        console.log(err)
        console.log(err.response.data.message);
        this.setState({errorMessage: err.response.data.message})
    })
};


export default refrToken;



