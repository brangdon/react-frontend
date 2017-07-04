import React from 'react';
var createReactClass = require('create-react-class');

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
        alert('A name was submitted: ' + this.state.login + ' : ' + this.state.password);

        fetch('/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                login: this.state.login,
                password: this.state.password,
            })
        })


        event.preventDefault();
    },

    render() {
        return (
            <div>
                <h2>Login form</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Login:
                        <input type="text" value={this.state.login} onChange={this.handleChangeLogin}/>
                        Password:
                        <input type="password" value={this.state.password} onChange={this.handleChangePassword}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
});

export default Login;