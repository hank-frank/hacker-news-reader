import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
const axios = require('axios');

function App () {
    const [stories, setStories] = useState(['test', 'test1', 'test2']);

    useEffect (() => {
    console.log(`second state `, stories);
    // console.log(`second state2 `, stories);
    }) 

     function call () {
        let storiesArr = [];
         
        axios.get(`http://hacker-news.firebaseio.com/v0/topstories.json`)
        .then((result) => {
            for (let i = 0; i < 30; i++) {
                axios.get(`http://hacker-news.firebaseio.com/v0/item/${result.data[i]}.json`)
                .then((result) => {
                    console.log(result)
                    storiesArr.push(result);
                })
            }
        })
        .catch((error) => {
            console.error(error);
        })
        console.log(`storiesArr `, storiesArr);
        setStories(storiesArr);
    }

    function test () {
        console.log(`stories from test button: `, stories)
        stories.map((each, i) => {
            return  <tr key={i}>
                        <td key={i}>{ each.data ? each.data.title : "nope" }</td>
                    </tr>
        })
    }

        return (
           <>
                <h1 onClick={ () => call() } className="click">Test</h1>
                <h1 onClick={ () => test() } className="click">Test2</h1>
                <table>
                    <thead>
                        <tr>
                            <td>Table</td>
                        </tr>
                    </thead>
                    <tbody>
                            <tr>
                                <td>{stories}</td>
                            </tr>
                    </tbody>
                </table>
           </>
        );

}

export default App;

// Items
// /v0/item/<integerid>.json
// Users
// /v0/user/<userid>.json/
// Top Stories
// /v0/topstories.json
