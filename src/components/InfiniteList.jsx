import React from 'react';

var createReactClass = require('create-react-class');
var Infinite = require('react-infinite');
var axios = require('axios');

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

var ListItem = createReactClass({

    getInitialState: function () {
        return {text: ''};
    },

    componentDidMount: function () {

    },

    render: function () {
        var number = this.props.num.replace('.jpg', '');

        console.log('rendering itemList')
        return <a href={'/Image/' + number}><span><img width={200} height={200}
                                                                src={require('../images/' + this.props.num)}/></span></a>
    }
});

var InfiniteList = createReactClass({
    getInitialState: function () {

        console.log('infinite list')
        return {
            isInfiniteLoading: false,
            images: this.fetchElement(0, 2)
        }
    },

    fetchElement: function (start, end) {

        var _this = this;
        console.log('fetching element')
        var elements = [];

        for (var i = start; i < end; i++) {
            this.serverRequest =
                axios
                    .get("/images/" + i)
                    .then(function (result) {

                        if (result) {
                            if (result.data.length > 0) {
                                console.log(result.data[0])
                                var n = result.data[0].ImageName

                                _this.setState({
                                    image: result.data,
                                    images: _this.state.images.concat(<ListItem key={getRandomArbitrary(0, 99999)}
                                                                                num={n}/>)
                                });

                                console.log('images len: ' + _this.state.images.length)
                            }
                        }
                    })
        }

        console.log('elements len: ' + elements.length)
        return elements;
    },

    componentWillUnmount: function () {
        this.serverRequest.abort();
    },

    handleInfiniteLoad: function () {
        var that = this;
        this.setState({
            isInfiniteLoading: true
        });
        setTimeout(function () {
            var imagesLength = that.state.images.length
            if (imagesLength > 60) {
                that.setState({
                    isInfiniteLoading: false
                });
            } else {
                var newImagesElements = that.fetchElement(imagesLength, imagesLength + 2);
                that.setState({
                    isInfiniteLoading: false,
                    // elements: that.state.elements.concat(newElements),
                    images: that.state.images.concat(newImagesElements)
                });
            }

        }, 1500);
    },

    elementInfiniteLoad: function () {
        return <div className="infinite-list-item">
            Loading...
        </div>;
    },

    render: function () {
        return <Infinite elementHeight={30}
                         containerHeight={600}
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