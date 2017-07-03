import React from 'react';
import * as firebase from 'firebase'
import InfiniteScroll from 'redux-infinite-scroll';



class Gallery extends React.Component {

    constructor() {
        super();
        this.state = {
            speed: 100,
        };
    }


    componentDidMount() {
        const rootRef = firebase.database().ref().child('posts');
        const speedRef = rootRef.child('1');

        speedRef.on('value', snap => {
            this.setState({
                speed: snap.val()
            });
        });
    }


    render() {
        return (
            <div>
                <h1>Gallery...</h1>
                <div id="posts">

                </div>
            </div>
        )
    }
}


export default Gallery;