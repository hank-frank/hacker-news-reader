import React, { useState, useEffect } from 'react';
// import { HashRouter as Router, Route } from 'react-router-dom';
// import { Helmet } from 'react-helmet';

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
    const [current, setCurrent] = useState();
    const [page, setPage] = useState(1);

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
      setCurrent('topStories');
     
    };

    const callBest = async () => {
        const storiesArr = await getStories(best, start, finish);
        setStories(formatStories(storiesArr));
        setCurrent('bestStories');
        
    };

      const callNew = async () => {
        const storiesArr = await getStories(recent, start, finish);
        setStories(formatStories(storiesArr));
        setCurrent('newStories');
        
    };

      const forward = () => {
        if (page > 8 ) {
          console.log("end of the line playboy... ")
        }else {
            setStart((start + 25));
            setFinish((finish + 25));
            setPage((page + 1))

            if (current == 'topStories'){
              callTop();
            } else if (current == 'bestStories') {
              callBest();
            } else if (current == 'newStories') {
              callNew();
            };
          }
      }

      const back = () => {
       if (page <= 1) {
         console.log("already at the start playboy...")
       } else {
          setStart((start - 25));
          setFinish((finish - 25));
          setPage((page - 1))
          if (current == 'topStories'){
            callTop();
          } else if (current == 'bestStories') {
            callBest();
          } else if (current == 'newStories') {
            callNew();
          };
        }
      }

      //leaving function and button for onCall for further pagination experiments
      // const test = () => {
      //   console.log(`start: `, start);
      //   console.log(`finish: `, finish);
      //   console.log(`current `, current)
      // }

    return (
      <div className="App">
          <Header
            new = { callNew }
            best = { callBest }
            top = { callTop }
            page = { page }
          />
        {/* <button className="test-button" onClick={() => test()}>Test</button> */}
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
        <div className="button-flex-bottom">
            <button className="page-button-bottom" onClick={() => back()}>Back</button>
            <button className="page-button-bottom" onClick={() => forward()}>Forward</button>
          </div>
      </div>
    );
  }

export default App;
