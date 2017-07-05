import React from 'react';
// import * as firebase from 'firebase'

var createReactClass = require('create-react-class');
var Infinite = require('react-infinite');

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

var ListItem = createReactClass({

    // constructor: function(props) {
    //     //noinspection JSAnnotator
    //     this.state = {
    //
    //     };
    // },

    getInitialState: function () {
        return {text: ''};
    },


    componentDidMount: function () {
        // const rootRef = firebase.database().ref().child('posts');
        // const speedRef = rootRef.child(this.props.num);

        // if (speedRef != null) {
        //     speedRef.on('value', snap => {
        this.setState({
            text: 'ala ma kota'
        });
        //     });
        // }else{
        //     speedRef.on('value', snap => {
        //         this.setState({
        //             text: 'ala ma kota'
        //         });
        //     });
        // }

    },


    render: function () {

        return this.props.num % 2 == 0
            ? <div className="infinite-list-item1">
                {this.state.text} {this.props.num} {this.props.key}
                <img width={300} height={300} src={require('../images/' + this.props.num)}/>
            </div>
            : <div className="infinite-list-item2">
                {this.state.text} {this.props.num} {this.props.key}
                <img width={300} height={300} src={require('../images/' + this.props.num)}/>
            </div>
            ;
    }
});

var InfiniteList = createReactClass({
    getInitialState: function () {

        console.log('infinite list')
        return {
            // elements: this.buildElements(0, 5),
            isInfiniteLoading: false,
            images: this.fetchElements(0, 15)
        }
    },

    fetchElements: function (start, end) {
        var that = this;
        console.log('fetching')
        var elements = [];
        for (var i = start; i < end; i++) {

            var name = ''

            fetch('/images/' + i).then(function (response) {
                return response.json();
            }).then(function (myBlob) {
                console.log('blobb: ' + myBlob[0].ImageName + ' key: ' + getRandomArbitrary(0,99999))
                var n = myBlob[0].ImageName
                elements.push(<ListItem key={getRandomArbitrary(0,99999)} num={n}/>)
            }).catch(function(err) {
                // Error :(
            });

        }
        return elements;
    },


    handleInfiniteLoad: function () {
        var that = this;
        this.setState({
            isInfiniteLoading: true
        });
        setTimeout(function () {
            // var elemLength = that.state.elements.length,
            //     newElements = that.buildElements(elemLength, elemLength + 2);
            var imagesLength = that.state.images.length,
                newImagesElements = that.fetchElements(imagesLength, imagesLength + 2);
            that.setState({
                isInfiniteLoading: false,
                // elements: that.state.elements.concat(newElements),
                images: that.state.images.concat(newImagesElements)
            });
        }, 1500);
    },

    elementInfiniteLoad: function () {
        return <div className="infinite-list-item">
            Loading...
        </div>;
    },

    render: function () {
        return <Infinite elementHeight={30}
                         containerHeight={500}
                         infiniteLoadBeginEdgeOffset={11}
                         onInfiniteLoad={this.handleInfiniteLoad}
                         loadingSpinnerDelegate={this.elementInfiniteLoad()}
                         isInfiniteLoading={this.state.isInfiniteLoading}
        >
            {this.state.images}
        </Infinite>;
    }
});

export default InfiniteList;