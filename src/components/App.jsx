import React from 'react';
// import * as firebase from 'firebase'
//

class Menu extends React.Component {
    render() {
        return (<div>
            <ul>
                <li><a href="/home">Home</a></li>
                <li><a href="/login">Login</a></li>
                <li><a href="/register">Register</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/gallery"> Gallery</a></li>
                <li><a href="/comments"> Comments</a></li>
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
        // const rootRef = firebase.database().ref().child('react');
        // const speedRef = rootRef.child('speed');
        //
        // speedRef.on('value', snap => {
        //     this.setState({
        //         speed: snap.val()
        //     });
        // });
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