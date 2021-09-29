import React from "react";

function QuestionItem({ questionNumber, question, questionArray, onDeleteQuestion, handleAnswer }) {
  const { id, prompt, answers, correctIndex } = question;
  //console.log(answers)

  //set up this to say DONT LOAD UNTIL QUESTION ARRAY IS RENDERED AND EXISTS - otherwise it is unable to map because answers is undefined because it hasnt been loaded
  //maps over each nested answer array to render each answer option
  //will not render if this is a function with if statement inside see below for ternery
 const options = answers.map((answer, index) => (
  <option key={index} value={index}>
    {answer}
  </option>
));
//this ternery says if the questionArray exists then render options if not do nothing
const renderOptions = !!questionArray ? options : null

  function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => onDeleteQuestion(id)); //callback function sends the question ID back UP to APP componant
  }

  function handleUpdateChange(event){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH", 
      headers: {
        "Content-Type": "application/json", 
      }, 
      body: JSON.stringify({
        "correctIndex": parseInt(event.target.value)
      })
    })
    .then(response => response.json())
    .then(answer => handleAnswer(answer))
  }

  return (
    <li>
      <h4>Question {questionNumber}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select 
          onChange={handleUpdateChange}
          defaultValue={correctIndex}> 
          {renderOptions}
          </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button> 
    </li>
  ); //onclick triggers the handleDeleteClick function to fetch delete ^^^
}

export default QuestionItem;
