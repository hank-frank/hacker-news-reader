import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Header from "./header.jsx"

let sampleData = [
    { 
        by: "lp001",
         descendants: 113,
         id: 21167871,
         kids: (14) [21169229, 21168671, 21168411, 21168594, 21168278, 21168159, 21168251, 21168732, 21168330, 21168697, 21168210, 21169171, 21168289, 21168629],
         score: 193,
         time: 1570308639,
         title: "Google, Xiaomi, and Huawei affected by zero-day flaw that unlocks root access",
         type: "story",
         url: "https://thenextweb.com/security/2019/10/04/google-xiaomi-and-huawei-devices-affected-by-zero-day-flaw-that-unlocks-root-access/"
     },
     {
         by: "danicgross",
         descendants: 6,
         id: 21158487,
         kids: (6) [21169239, 21169225, 21169227, 21169215, 21169078, 21169035],
         score: 40,
         time: 1570202112,
         title: "Streamlit: Turn a Python script into an interactive data analysis tool",
         type: "story",
         url: "https://towardsdatascience.com/coding-ml-tools-like-you-code-ml-models-ddba3357eace?source=friends_link&sk=f7774c54571148b33cde3ba6c6310086"
     },
     {
         by: "carrozo",
         descendants: 33,
         id: 21167683,
         kids: (13) [21168130, 21169118, 21168568, 21167918, 21168204, 21168499, 21168585, 21169155, 21168023, 21168273, 21168031, 21168032, 21168861],
         score: 97,
         time: 1570306694,
         title: "The Wave that changed the world (2017)",
         type: "story",
         url: "https://www.paloaltoonline.com/news/2017/03/17/the-wave-that-changed-history",
     }
 ]



// gets list of Top article ids
const getTopStoryList = async () => {
    const res = await fetch(
      "https://hacker-news.firebaseio.com/v0/topstories.json"
    );
    return await res.json();
  };

//get list of all New article id's
const getNewStoryList = async () => {
    const res = await fetch(
      "https://hacker-news.firebaseio.com/v0/newstories.json"
    );
    return await res.json();
  };

//get list of all New article id's
const getBestStoryList = async () => {
    const res = await fetch(
      "https://hacker-news.firebaseio.com/v0/beststories.json"
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

    const callTop = async () => {
      // first get list of stories
      const res = await getTopStoryList();
      // then async request all of the individual articles
      // and push them into a group of promises
      const storiesArr = await getStories(res, 25);
      console.log(`storiesArr Top: `, storiesArr)
      // then set your state.
      setStories(formatStories(storiesArr));
      console.log(`stories array: `, stories)
    };

    const callBest = async () => {
        // first get list of stories
        const res = await getBestStoryList();
        // then async request all of the individual articles
        // and push them into a group of promises
        const storiesArr = await getStories(res, 25);
        console.log(`storiesArr Best: `, storiesArr)
        // then set your state.
        setStories(formatStories(storiesArr));
        // console.log(`stories array: `, stories)
      };

      const callNew = async () => {
        // first get list of stories
        const res = await getNewStoryList();
        // then async request all of the individual articles
        // and push them into a group of promises
        const storiesArr = await getStories(res, 25);
        console.log(`storiesArr New: `, storiesArr)
        // then set your state.
        setStories(formatStories(storiesArr));
        console.log(`stories array: `, stories)
      };

    return (
      <div className="App">
          <Header
            new = {callNew}
            best = {callBest}
            top = {callTop}
          />
        <table className="table">
          <tbody>
            {sampleData.map(story => {
                // console.log(`each story: `, story)
              return (
                <tr key={story.id}>
                  <td>
                      <div className="flex-row">
                        <a href={story.url} className="title">{story.title}</a> 
                        <p className="by">by {story.by}</p>
                      </div>
                    <p className="display-url">{story.url}</p>
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


