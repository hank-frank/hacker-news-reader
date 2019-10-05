import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
const axios = require('axios');
import wretch from "wretch"


// gets list of article ids
const getStoryList = async () => {
    const res = await fetch(
      "https://hacker-news.firebaseio.com/v0/topstories.json"
    );
    return await res.json();
  };
  // iterates over article list and returns a promise.all
  const getStories = (articles, quantity) => {
    return Promise.all(
      articles.slice(0, quantity).map(async article => {
        const storyRes = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${article}.json`
        );
        return await storyRes.json();
      })
    );
  };
  // maps your response data
  const formatStories = stories =>
    stories.map(({ by, id, url, title = "No Title" }) => ({
      id,
      title,
      url,
      by
    }));
  function App() {
    const [stories, setStories] = useState([]);
    const call = async () => {
      // first get list of stories
      const res = await getStoryList();
      // then async request all of the individual articles
      // and push them into a group of promises
      const storiesArr = await getStories(res, 20);
      // then set your state.
      setStories(formatStories(storiesArr));
    };
    return (
      <div className="App">
        <button onClick={call} className="click">
          {/* Fire off API calls */}
        </button>
        <table className="table">
          <thead>
            <tr>
              <td>Table</td>
            </tr>
          </thead>
          <tbody>
            {stories.map(story => {
              return (
                <tr key={story.id}>
                  <td>
                    <a href={story.url}>{story.title}</a> by {story.by}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

export default App;

//the different api calls:
// Items
// /v0/item/<integerid>.json
// Users
// /v0/user/<userid>.json/
// Top Stories
// /v0/topstories.json


//broken version: 

// function App () {
//     const [stories, setStories] = useState(["test", "test2", "test3"]);

//     useEffect (() => {
//     console.log(`stories from uerEffect: `, stories);

//     }) 

//      function call () {
//         let storiesArr = [];
         
//         // axios.get(`http://hacker-news.firebaseio.com/v0/topstories.json`)
//         // .then((result) => {
//         //     for (let i = 0; i < 30; i++) {
//         //         axios.get(`http://hacker-news.firebaseio.com/v0/item/${result.data[i]}.json`)
//         //         .then((res) => {
//         //             // console.log(`resposne: `, res)
//         //             storiesArr.push(res);
//         //         })
//         //         setStories(storiesArr)
//         //     }
//         // })
//         // .catch((error) => {
//         //     console.error(error);
//         // })

//         // fetch('http://hacker-news.firebaseio.com/v0/topstories.json')
//         //     .then ((res) => res.json())
//         //     .then ((data) => {
//         //         console.log(`data`, data);
//         //         for (let i = 0; i < 30; i++) {
//         //             fetch(`http://hacker-news.firebaseio.com/v0/item/${data[i]}.json`)
//         //             .then((res) => res.json())
//         //             .then((eachStory) => {
//         //                 console.log(eachStory.title)
//         //                 storiesArr.push(eachStory);
//         //             })
//         //         }
//         //     })

//         wretch("http://hacker-news.firebaseio.com/v0/topstories.json")
//             .get()
//             .json(data => {
//                 // console.log(json)
//                 for (let i = 0; i < 20; i++) {
//                 wretch(`http://hacker-news.firebaseio.com/v0/item/${data[i]}.json`)
//                     .get()
//                     .json(stories => {
//                         storiesArr.push(stories);
//                     })
//                 }
//             })
//         setStories(storiesArr);
//     }

//     function test () {
//         console.log(stories);
       
//        stories.map((each) => {
//             console.log(each.title ? each.title : "whoopsie daisy's")
//             return <p>{each.title}</p>
//         })
//     }

//         return (
            
//            <>
//                 <h1 onClick={ () => call() } className="click">Fire off API calls</h1>
//                 <h1 onClick={ () => test() } className="click">Test state of stories/<br/>.map each title</h1>
//                 <table className="table">
//                     <thead>
//                         <tr>
//                             <td>Table</td>
//                         </tr>
//                     </thead>
//                     <tbody>
//                            {
//                                 stories.map((each, i) => {
//                                     // console.log(each.title ? each.title : "whoopsie daisy's")
//                                     return <tr key={i}>
//                                             <td>{each.title ? each.title : each}</td>
//                                         </tr>
//                             })
//                            }
//                     </tbody>
//                 </table>
               
//            </>
//         );
// }