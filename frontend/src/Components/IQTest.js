import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const IQTest = (props) => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    Axios({
      method: "GET",
      url: "http://localhost:4000/getchallenge",
    }).then((data) => {
      console.log(data.data);
      setQuestions(data.data);
    });
  }, []);

  const onChange = (e) => {
    e.preventDefault();
    setUserAnswers({ ...userAnswers, [e.target.name]: e.target.value });
    console.log(userAnswers);
  };

  const answerOption = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div>
      {!isAuthenticated ? <Redirect to="/login" /> : null}
      <h1>Welcome To IQ Test</h1>
      <h2>{!user.username ? null : user.username}</h2>
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
                  <div>
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
