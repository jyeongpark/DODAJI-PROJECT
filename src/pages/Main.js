import React, { useState, useEffect } from "react";
import SelectCard from "components/cards/SelectCard";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "css/Main.css";

function Main(props) {
  const question = props.question;
  const answer1 = props.answer1;
  const answer2 = props.answer2;
  const [nowIndex, setNowIndex] = useState(0);
  const [nowQ, setNowQ] = useState(question[nowIndex]);
  const [nowA1, setNowA1] = useState(answer1[nowIndex]);
  const [nowA2, setNowA2] = useState(answer2[nowIndex]);
  const [prevalue, setPrevalue] = useState();
  const [finish, setFinish] = useState(false);
  const handleClick = (value, typeId) => {
    props.handleAnswer(value, typeId);
    setPrevalue(value);

    if (nowIndex === 14) {
      setFinish(true);
    } else setNowIndex(nowIndex + 1);
  };

  const handleBack = (typeId) => {
    switch (nowIndex) {
      case 0:
        alert("첫번째 문항입니다.");
        break;
      default:
        props.handleBack(prevalue, typeId);
        setNowIndex(nowIndex - 1);
        break;
    }
  };
  const handleResult = () => {
    props.handleResult();
  };
  useEffect(() => {
    if (finish) {
      setNowQ(null);
      setNowA1(null);
      setNowA2(null);
    } else {
      setNowQ(question[nowIndex]);
      setNowA1(answer1[nowIndex]);
      setNowA2(answer2[nowIndex]);
    }
  });
  return (
    <div>
      <h1>새로운메인</h1>
      {finish ? (
        <Link to={`/result`}>
          <button onClick={handleResult}>결과보러가기</button>
        </Link>
      ) : (
        <div>
          <SelectCard
            question={nowQ}
            answer1={nowA1}
            answer2={nowA2}
            nowIndex={nowIndex + 1}
            onClick={handleClick}
            onBack={handleBack}
          />
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    question: state.question,
    answer1: state.answer1,
    answer2: state.answer2,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleAnswer: (value, typeId) =>
      dispatch({
        type: "handleAnswer",
        value: value,
        typeId: typeId,
      }),
    handleResult: () => {
      dispatch({ type: "handleResult" });
    },
    handleBack: (prevalue, typeId) => {
      dispatch({ type: "handleBack", prevalue: prevalue, typeId: typeId });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
