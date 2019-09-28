import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
const axios = require('axios');

class App extends Component {
    constructor() {
        super();

        this.state = {
            
        };
    }

    call () {
        axios.get(`http://hacker-news.firebaseio.com/v0/topstories.json`)
        .then((result) => {
            // res.send(result.data);
            console.log(`result `, result.data)
            for (let i = 0; i < 30; i++) {
                axios.get(`http://hacker-news.firebaseio.com/v0/item/${result.data[i]}.json`)
                .then((result) => {
                    console.log(`each result: `, result)
                })
            }
        })
        .catch((error) => {
            console.error(error);
            // res.send('An error occured.');
        })
    }

    render() {
        return (
           <>
                <h1 onClick={ this.call } className="click">Test</h1>

           </>
        );
    }
}

export default App;

// Items
// /v0/item/<integerid>.json
// Users
// /v0/user/<userid>.json/
// Top Stories
// /v0/topstories.json
