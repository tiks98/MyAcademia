import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { useStopwatch } from "react-timer-hook";

const IQTest = (props) => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { seconds, minutes, isRunning, start, pause, reset } = useStopwatch({
    autoStart: true,
  });
  const [myProfile, setMyProfile] = useState({
    mypid: "",
    firstName: "",
    lastName: "",
    IQ: 0,
  });

  useEffect(() => {
    Axios({
      method: "GET",
      url: "http://localhost:4000/getchallenge",
    }).then((data) => {
      // console.log(data.data); Development purpose only
      setQuestions(data.data);
    });
    Axios({
      method: "GET",
      url: "http://localhost:4000/profile/",
      params: {
        username: user.username,
      },
    }).then((data) => {
      // console.log(data); Development purpose only
      if (data.data === null) {
        // console.log("No Profile data found"); Development purpose only
        window.location.reload(false);
      } else {
        setMyProfile({
          ...myProfile,
          mypid: data.data._id,
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          IQ: data.data.IQ,
        });
        // console.log(myProfile); Development purpose only
      }
    });
  }, []);

  const onChange = (e) => {
    e.preventDefault();
    setUserAnswers({ ...userAnswers, [e.target.name]: e.target.value });
    // console.log(userAnswers); Development Purpose only
  };

  const MyStopwatch = () => {
    return (
      <div style={{ textAlign: "center", fontSize: "20px"}}>
        {/* <p>Time</p> */}
        <div style={{ fontSize: "70px" }}>
          <span>{minutes}</span>:<span>{seconds}</span>
        </div>
        {/* <p>{isRunning ? "Running" : "Not running"}</p>
        <button onClick={start}>Start</button>
        <button onClick={pause}>Pause</button>
        <button onClick={reset}>Reset</button> */}
      </div>
    );
  };

  const TestFinishAuto = () => {
    pause(true);
    setShowScore(true);
    const timeTaken = `${minutes}:${seconds}`;
    // console.log(timeTaken); Development purpose only
    const secondsCalculation = minutes * 60 + seconds;
    const minutesCalcualtion = seconds / 60 + minutes;
    // console.log(secondsCalculation); Development purpose only
    // console.log(minutesCalcualtion); Development purpose only
    var IQ = (score / minutesCalcualtion) * 100;
    if (IQ > 250) {
      if (IQ > 999) {
        IQ = IQ / 100;
      } else {
        IQ = IQ / 10;
      }
    }
    const calculatedIQ = Math.round(IQ.toString());
    // console.log(calculatedIQ); Development purpose only
    if (calculatedIQ > myProfile.IQ) {
      Axios({
        method: "put",
        data: {
          IQ: calculatedIQ,
        },
        url: `http://localhost:4000/profile/${myProfile.mypid}`,
      }).then((data) => {
        // console.log(data.data); Development purpose only
      });
    }
    Axios({
      method: "post",
      data: {
        username: user.username,
        fullname: `${myProfile.firstName} ${myProfile.lastName}`,
        userScore: score,
        calculatedIQ: calculatedIQ,
        timeTaken: timeTaken,
      },
      url: "http://localhost:4000/newscore",
    }).then((data) => {
      // console.log(data.data); Development purpose only
      props.history.push("/challenge");
    });
    return <></>;
  };

  const answerOption = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      TestFinishAuto();
    }
  };

  return (
    <div className="iqTest">
      {!isAuthenticated ? <Redirect to="/login" /> : null}
      <h1>Welcome To IQ Test</h1>
      
      <h2 className="iqUsername">{!user.username ? null : user.username}</h2>
      <h2 className="iqName">{!myProfile ? null : myProfile.firstName}</h2>
      <ul>
        <li><p className="iqTime">You have 30 minutes to complete the test</p></li>
        <li><p className="iqAbout">
          IQ calculated from this Test is not 100% accurate, it is based on your
          score by your time taken</p></li>
      </ul>
      <div>
        <MyStopwatch />
      </div>
      {minutes > 29 ? <TestFinishAuto /> : null}
      {showScore ? (
        <div>
          You scored {score} out of {questions.length}
        </div>
      ) : (
        <div>
          {questions.length === 0 ? (
            <h1>No Question available</h1>
          ) : (
            <>
              <div className="question-section">
                <div className="question-count">
                  <span>Question {currentQuestion + 1}</span>/{questions.length}
                </div>
                <div className="question-text">
                  {questions[currentQuestion].question}
                </div>
              </div>
              <div className="answer-section">
                {questions[currentQuestion].answers.map((answer) => (
                  <div className="answerBtn">
                    <button
                      className="btn btn-primary"
                      onClick={() => answerOption(answer.isCorrect)}
                    >
                      {answer.option}
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default IQTest;
