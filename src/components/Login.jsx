import React from 'react';
var createReactClass = require('create-react-class');
var axios = require('axios')
import {browserHistory} from 'react-router'
var Login = createReactClass({

    getInitialState: function () {
        return {
            login: '',
            password: ''
        };
    },

    handleChangeLogin: function (event) {
        this.setState({login: event.target.value});
    },

    handleChangePassword: function (event) {
        this.setState({password: event.target.value});
    },

    handleSubmit: function (event) {
        // browserHistory.push('/register');
        // alert('A name was submitted: ' + this.state.login + ' : ' + this.state.password);

        // fetch('/login', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         login: this.state.login,
        //         password: this.state.password,
        //     })
        // })

        axios.post('/login', {
            login: this.state.login,
            password: this.state.password
        })
            .then(function (response) {
                console.log('login response')
                console.log(response);
                // this.props.history.push('/');
                browserHistory.push('/');
            })
            .catch(function (error) {
                console.log(error);
            });


        event.preventDefault();
    },

    render() {
        return (
            <div>
                <h2>Login form</h2>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <label>
                        Login:
                    </label>
                    <input type="text" value={this.state.login} onChange={this.handleChangeLogin}/>
                    <label>
                        Password:
                    </label>
                    <input type="password" value={this.state.password} onChange={this.handleChangePassword}/>

                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
});

export default Login;