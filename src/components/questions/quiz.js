import React from 'react';
import QuestionImage from './questionimage.js'
import QuizProgress from './quizprogress.js'
import Questions from './questions.js'
import { Box, RadioButton, Button, Tabs, Tab } from 'grommet';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import './quiz.css'
import { Link, animateScroll as scroll } from "react-scroll";

const Results = (props) => {
  return (
    <div className="results fade-in">
      <h1>Your score: {((props.correct/props.questionLength) * 100).toFixed()}%</h1>
      <Button type="button" onClick={props.startOver}>Try again <i className="fas fa-redo"></i></Button>
    </div>
  );
}

class Quiz extends React.Component {
  constructor(props) {
    super(props);

    this.updateAnswer = this.updateAnswer.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.getResults = this.getResults.bind(this);
    this.startOver = this.startOver.bind(this);

    this.state = {
      currentQuestion: 0,
      correct: 0,
      inProgress: true,
      questions: [],
    }
  }

  updateAnswer(e) {
    //record whether the question was answered correctly
    let answerValue = e.target.value;
    this.setState({ selected: e })
    this.setState((prevState, props) => {
      let stateToUpdate = prevState.questions;
      //convert boolean string to boolean with JSON.parse()
      stateToUpdate[prevState.currentQuestion].answerCorrect = JSON.parse(answerValue);

      return {questions: stateToUpdate};
    });
  }

  checkAnswer(e) {
    //display to the user whether their answer is correct
    this.setState((prevState, props) => {
      let stateToUpdate = prevState.questions;
      stateToUpdate[prevState.currentQuestion].checked = true;

      return {questions: stateToUpdate};
    });

    scroll.scrollToBottom();
  }

  nextQuestion(e) {
    //advance to the next question
    this.setState((prevState, props) => {
      let stateToUpdate = prevState.currentQuestion;

      return {currentQuestion: stateToUpdate+1};
    }, () => {
      this.radioRef.current.reset();
    });
  }

  getResults() {
    //loop through questions and calculate the number right
    let correct = this.state.correct;

    this.state.questions.forEach((item, index) => {
      if (item.answerCorrect) {
        ++correct;
      }

      if (index === (this.state.questions.length-1)) {
        this.setState({
          correct: correct,
          inProgress: false
        });
      }
    });
  }

  startOver() {
    //reset form and state back to its original value
    this.setState((prevState, props) => {
      let questionsToUpdate = prevState.questions;

      questionsToUpdate.forEach(item => {
        //clear answers from previous state
        delete item.answerCorrect;
        delete item.checked;
      });

      return {
        inProgress: true,
        correct: 0,
        currentQuestion: 0,
        questions: questionsToUpdate
      }
    });
  }

  componentDidMount() {
    //since we're re-using the same form across questions,
    //create a ref to it so we can clear its state after a question is answered
    this.radioRef = React.createRef();
    this.setState({
      questions: Questions,
    })
  }

  render() {
    const { selected } = this.state;

    if (!this.state.inProgress) {
      return (
        <section className="quiz">
          <Results correct={this.state.correct} questionLength={this.state.questions.length} startOver={this.startOver} />
        </section>
      );
    }

    if(this.state.questions && this.state.questions.length > 1) {
      return (
        <Box width="large">
          <QuizProgress currentQuestion={this.state.currentQuestion} questionLength={this.state.questions.length} />
          <Tabs>
            <Tab title="1">
              <br></br>
              <Box>
                <div className="question-container">
                  <SyntaxHighlighter style={docco} showLineNumbers language="java">{this.state.questions[this.state.currentQuestion].question}</SyntaxHighlighter>
                  <br></br>
                  <form ref={this.radioRef}>
                    {this.state.questions[this.state.currentQuestion].options.map((item, index) => {
                      return  (
                        <div key={index}
                          className={"option" + (this.state.questions[this.state.currentQuestion].checked && !item.correct ? ' dim' : '') + (this.state.questions[this.state.currentQuestion].checked && item.correct ? ' correct' : '')}>
                          <RadioButton label={item.option} id={"radio-"+index} checked={selected === item} onChange={() => this.setState({ selected: item })} onClick={this.updateAnswer} type="radio" name="option" value={item.correct}
                              disabled={this.state.questions[this.state.currentQuestion].checked} />
                        </div>
                      )
                      })}
                  </form>
                  <div>
                    <br></br>
                    {this.state.questions[this.state.currentQuestion].feedback && this.state.questions[this.state.currentQuestion].checked
                      && <div className="fade-in">
                        <p>
                          {this.state.questions[this.state.currentQuestion].feedback}
                          {this.state.questions[this.state.currentQuestion].moreUrl &&

                               (<a href={this.state.questions[this.state.currentQuestion].moreUrl}> Learn more</a>)

                          }
                        </p>
                      </div>
                    }
                    {!this.state.questions[this.state.currentQuestion].checked &&
                       <Button label={'Check answer'} onClick={this.checkAnswer}
                       disabled={!('answerCorrect' in this.state.questions[this.state.currentQuestion])}/>
                     }

                    {(this.state.currentQuestion+1) < this.state.questions.length && this.state.questions[this.state.currentQuestion].checked &&
                      <Button label={'Next'} className="fade-in next" type="button" onClick={this.nextQuestion}/>
                    }
                  </div>
                  {(this.state.currentQuestion+1) === this.state.questions.length && this.state.questions[this.state.currentQuestion].checked &&
                    <Button type="button" className="get-results pulse" onClick={this.getResults}>Get Results</Button>
                  }
                  <br></br>
                </div>

              </Box>
            </Tab>
            <Tab title="2">
              <Box pad="medium">Two</Box>
            </Tab>
          </Tabs>

        </Box>
      )
    }
    return (
      <p>Loading</p>
    )
  }
}
export default Quiz;
