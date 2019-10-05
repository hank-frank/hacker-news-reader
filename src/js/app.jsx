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
        // console.log(`storyRes: `, storyRes)
        return await storyRes.json();
      })
    );
  };
  // maps your response data
  const formatStories = stories =>
    stories.map(({ by, id, url, score, kids, title = "No Title" }) => ({
      id,
      title,
      url,
      by, 
      score,
      kids
    }));
  function App() {
    const [stories, setStories] = useState([]);

    const call = async () => {
      // first get list of stories
      const res = await getStoryList();
      // then async request all of the individual articles
      // and push them into a group of promises
      const storiesArr = await getStories(res, 25);
      console.log(`storiesArr: `, storiesArr)
      // then set your state.
      setStories(formatStories(storiesArr));
    };

    return (
      <div className="App">
        <button onClick={call} className="click">
          Fire off API calls
        </button>
        <table className="table">
          <tbody>
            {stories.map(story => {
                // console.log(`each story: `, story)
              return (
                <tr key={story.id}>
                  <td>
                    <a href={story.url} className="title">{story.title}<p className="display-url">{story.url}</p></a><p className="by">by {story.by}</p>
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
