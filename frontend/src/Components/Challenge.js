import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const Challenge = (props) => {
  const { isAuthenticated, user, googleLogin } = useContext(AuthContext);
  const [userScores, setUserScores] = useState([]);
  const [allScores, setAllScores] = useState([]);
  const [sortIQClicked, setSortIQClicked] = useState(false);
  const [sortDateClicked, setSortDateClicked] = useState(false);

  useEffect(() => {
    Axios({
      method: "GET",
      params: {
        username: user.username,
      },
      url: "http://localhost:4000/score",
    }).then((data) => {
      console.log(data.data);
      setUserScores(data.data);
    });
    Axios({
      method: "GET",
      url: "http://localhost:4000/getscore",
    }).then((data) => {
      console.log(data);
      setAllScores(data.data);
    });
  }, []);

  const sortByIQ = () => {
    setSortIQClicked(true);
    setSortDateClicked(false);
  };

  const sortByDate = () => {
    setSortDateClicked(true);
    setSortIQClicked(false);
  };

  const resetSort = () => {
    setSortIQClicked(false);
    setSortDateClicked(false);
  };

  const takeIQTest = () => {
    props.history.push("/newtest");
  };

  return (
    <div>
      {!isAuthenticated ? <Redirect to="/login" /> : null}
      <h1>Welcome to Challenge Page</h1>
      <h2>{!user.username ? null : user.username}</h2>
      <button className="btn btn-primary" onClick={takeIQTest}>
        Take IQ Test
      </button>
      <h3>My Personal Scores</h3>
      {userScores
        .sort((a, b) => {
          if (a.date.slice(0, 4) === b.date.slice(0, 4)) {
            if (a.date.slice(5, 7) === b.date.slice(5, 7))
              return b.date.slice(8, 10) - a.date.slice(8, 10);
            else return b.date.slice(5, 7) - a.date.slice(5, 7);
          } else return b.date.slice(0, 4) - a.date.slice(0, 4);
        })
        .map((userScore) => (
          <div key={userScore._id} className="card border-dark bg-light mb-3">
            <h4>Username: {userScore.username}</h4>
            <h4>Score: {userScore.userScore}</h4>
            <h4>IQ: {userScore.calculatedIQ}</h4>
            <h4>TimeTaken: {userScore.timeTaken}</h4>
            <h4>Date: {userScore.date}</h4>
          </div>
        ))}
      <h2>Leaderboards</h2>
      <button className="btn btn-primary" onClick={sortByIQ}>
        Sort by IQ
      </button>
      <button className="btn btn-primary" onClick={sortByDate}>
        Sort by Date
      </button>
      <button className="btn btn-primary" onClick={resetSort}>
        Reset Sort
      </button>
      {allScores.length === 0 ? null : (
        <div>
          {sortIQClicked ? (
            <div>
              <h4>Sorted By IQ</h4>
              {allScores
                .sort((a, b) => b.calculatedIQ - a.calculatedIQ)
                .map((score) => (
                  <div
                    key={score._id}
                    className="card border-dark bg-light mb-3"
                  >
                    <h4>Username: {score.username}</h4>
                    <h4>Score: {score.userScore}</h4>
                    <h4>IQ: {score.calculatedIQ}</h4>
                    <h4>TimeTaken: {score.timeTaken}</h4>
                    <h4>Date: {score.date}</h4>
                  </div>
                ))}
            </div>
          ) : (
            <div>
              {sortDateClicked ? (
                <div>
                  <h4>Sorted By Date</h4>
                  {allScores
                    .sort((a, b) => {
                      if (a.date.slice(0, 4) === b.date.slice(0, 4)) {
                        if (a.date.slice(5, 7) === b.date.slice(5, 7))
                          return b.date.slice(8, 10) - a.date.slice(8, 10);
                        else return b.date.slice(5, 7) - a.date.slice(5, 7);
                      } else return b.date.slice(0, 4) - a.date.slice(0, 4);
                    })
                    .map((score) => (
                      <div
                        key={score._id}
                        className="card border-dark bg-light mb-3"
                      >
                        <h4>Username: {score.username}</h4>
                        <h4>Score: {score.userScore}</h4>
                        <h4>IQ: {score.calculatedIQ}</h4>
                        <h4>TimeTaken: {score.timeTaken}</h4>
                        <h4>Date: {score.date}</h4>
                      </div>
                    ))}
                </div>
              ) : (
                <div>
                  <h4>Sorted By Score</h4>
                  {allScores
                    .sort((a, b) => {
                      if (a.userScore === b.userScore) {
                        if (a.timeTaken === b.timeTaken) {
                          if (a.date.slice(1, 4) === b.date.slice(1, 4)) {
                            if (a.date.slice(6, 7) === b.date.slice(6, 7))
                              return b.date.slice(9, 10) - a.date.slice(9, 10);
                            else return b.date.slice(6, 7) - a.date.slice(6, 7);
                          } else return b.date.slice(1, 4) - a.date.slice(1, 4);
                        } else {
                          if (
                            a.timeTaken.slice(1, 2) === b.timeTaken.slice(1, 2)
                          ) {
                            return (
                              a.timeTaken.slice(4, 5) - b.timeTaken.slice(4, 5)
                            );
                          } else
                            return (
                              a.timeTaken.slice(1, 2) - b.timeTaken.slice(1, 2)
                            );
                        }
                      } else return b.userScore - a.userScore;
                    })
                    .map((allScore) => (
                      <div
                        key={allScore._id}
                        className="card border-dark bg-light mb-3"
                      >
                        <h4>Username: {allScore.username}</h4>
                        <h4>Score: {allScore.userScore}</h4>
                        <h4>IQ: {allScore.calculatedIQ}</h4>
                        <h4>TimeTaken: {allScore.timeTaken}</h4>
                        <h4>Date: {allScore.date}</h4>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Challenge;
