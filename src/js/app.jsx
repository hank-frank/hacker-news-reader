import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
const axios = require('axios');

function App () {
    const [strs, setStrs] = useState([]);

    useEffect (() => {
    console.log('test');
    console.log(`second stories `, strs);
    }) 

     function call () {
        let storiesArr = [];
         
        axios.get(`http://hacker-news.firebaseio.com/v0/topstories.json`)
        .then((result) => {
            for (let i = 0; i < 30; i++) {
                axios.get(`http://hacker-news.firebaseio.com/v0/item/${result.data[i]}.json`)
                .then((result) => {
                    storiesArr.push(result);
                })
            }
        })
        .catch((error) => {
            console.error(error);
        })
        console.log(`storiesArr `, storiesArr);
        setStrs(storiesArr);
    }

        return (
           <>
                <h1 onClick={ () => call() } className="click">Test</h1>
                <table>
                    <tbody>
                        <tr>
                            <td>Test</td>
                            <td>{strs}</td>
                        </tr>
                            {
                                strs.map((each) => {
                                    return (<tr>
                                            <td>{ each.data.title } Test</td>
                                        </tr>
                                    );
                                })
                            }
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
