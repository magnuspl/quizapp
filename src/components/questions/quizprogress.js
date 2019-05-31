import React from 'react';
import {Heading} from 'grommet';

const QuizProgress = (props) => {
  return (
    <div className="progress">
      <p className="counter">
        <Heading level="3">Java SE Exam: question {props.currentQuestion+1} of {props.questionLength}</Heading>
      </p>
    </div>
  );
}

export default QuizProgress;
