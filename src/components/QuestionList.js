import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({questionArray, onDeleteQuestion, handleAnswer}) {
  //!!questionArray ? console.log(questionArray) : console.log('none')
let questionNumber = 0

  return (

    <section>
      <h1>Quiz Questions</h1>
      <ul>
        
          {!!questionArray ? questionArray.map((question) => {
            questionNumber += 1
              return <QuestionItem 
                questionNumber={questionNumber}
                key={question.id} 
                handleAnswer={handleAnswer}  
                onDeleteQuestion={onDeleteQuestion}  
                questionArray={questionArray} 
                question={question}
                id={question.id} 
                prompt={question.prompt} 
                answers={question.answers} 
                correctIndex={question.correctIndex} 
                />}) : null}
      </ul>
      
    </section>
  );
}

export default QuestionList;