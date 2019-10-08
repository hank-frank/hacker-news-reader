import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Header from "./header.jsx"

  const getStories = (articles, start, finish) => {
    return Promise.all(
      articles.slice(start, finish).map(async article => {
        const storyRes = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${article}.json`
        );
        return await storyRes.json();
      })
    );
  };

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
    const [start, setStart] = useState(0);
    const [finish, setFinish] = useState(25);
    const [top, setTop] = useState([]);
    const [best, setBest] = useState([]);
    const [recent, setRecent] = useState([]);

    useEffect ( () => {
      async function fetchTop () {
      const res = await fetch(
        "https://hacker-news.firebaseio.com/v0/topstories.json"
      );
        let topData = await res.json();
        setTop(topData);
    };

    async function fetchBest () {
      const res = await fetch(
        "https://hacker-news.firebaseio.com/v0/beststories.json"
      );
        let bestData = await res.json();
        setBest(bestData);
    };

    async function fetchNew () {
      const res = await fetch(
        "https://hacker-news.firebaseio.com/v0/newstories.json"
      );
        let newData = await res.json();
        setRecent(newData);
    };

    fetchBest();
    fetchNew();
    fetchTop();
  }, []); 

    const callTop = async () => {
      const storiesArr = await getStories(top, start, finish);
      setStories(formatStories(storiesArr));
    };

    const callBest = async () => {
        const storiesArr = await getStories(best, start, finish);
        setStories(formatStories(storiesArr));
      };

      const callNew = async () => {
        const storiesArr = await getStories(recent, start, finish);
        setStories(formatStories(storiesArr));
      };

      const forward = (start, finish) => {
            setStart(start + 25);
            setFinish(finish + 25);
            callTop();
      }

      const back = (start, finish) => {
        if (start > 25) {
          setStart(start - 25);
          setFinish(finish - 25);
        }
      }

      const test = () => {
        console.log(`top from test: `, top);
        console.log(`best: `, best);
        console.log(`new: `, recent)
      }

    return (
      <div className="App">
          <Header
            new = {callNew}
            best = {callBest}
            top = {callTop}
          />
          <button className="test-button" onClick={() => test()}>Test</button>
          <button className="test-button" onClick={() => back()}>Back</button>
          <button className="test-button" onClick={() => forward()}>Forward</button>
        <table className="table">
          <tbody>
            {stories.map(story => {
              return (
                <tr key={story.id}>
                  <td>
                      <div className="flex-row">
                        <a href={story.url} className="title" target="_blank">{story.title}</a> 
                        <p className="by">by {story.by}</p>
                      </div>
                    <p className="display-url">{story.url}</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* <button className="test-button" onClick={forward()}>Back</button>
        <button className="test-button" onClick={back()}>Forward</button> */}
      </div>
    );
  }

export default App;

//the different api calls:
// Items
// /v0/item/<integerid>.json
// Users
// /v0/user/<userid>.json/
