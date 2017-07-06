import React from 'react';

class Menu extends React.Component {
    render() {
        return (<div className="list">
            <ul>
                <li><a href="/home">Home</a></li>
                <li><a href="/login">Login</a></li>
                <li><a href="/register">Register</a></li>
                <li><a href="/annoucements">Annoucements</a></li>
                <li><a href="/gallery"> Gallery</a></li>
            </ul>

        </div>);
    }
}

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            speed: 100,
            childVisible: false
        };
    }

    onClick() {
        console.log(this.state.childVisible)
        this.setState({childVisible: !this.state.childVisible});
    }

    componentDidMount() {
    }

    render() {
        return (


            <div id="menu">
                <div className="accordion" onClick={() => this.onClick()}>Menu</div>

                {
                    this.state.childVisible
                        ? <Menu />
                        : null
                }

            </div>
        )
    }
}

export default App;