import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questionArray, setQuestionArray] = useState([]) //state that holds current questions for the quiz (can be added/deleted/updated)
  //HAVE TO USE EMPTY ARRAY FOR INITIAL VALUE IN USESTATE OR ELSE IT WONT RENDER
 
  //fetching data initially here
  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(response => response.json()
    .then(data => renderQuestions(data))) //putting this data into the renderQuestion function
  }, [])

  //rendering each question and setting it to the current state of question array upon page load
  //fetching data from the useEffect fetch
  let renderQuestions = (data) => {
      setQuestionArray(data) 
  }

  //delete handler
  function handleDeleteQuestion(deletedItemId) { //takes in deleted item passed up from QuestionItem //NOTE the deleted item IS the items id 
    console.log("IN APP",deletedItemId) //console.logs id of item clicked
    const updatedQuestions = questionArray.filter(question => question.id !== deletedItemId);
    setQuestionArray(updatedQuestions); //filters out the deleted question by comparing the questions IDs in teh question array to the deleted item id. if it matches it is not returned
    //then setting the new question array to the NEW array without the deleted item 
  }

  const handleAnswer = (answer) => {
    
    const correctAnswer = questionArray.filter(question => question.correctIndex !== answer.correctIndex)

    console.log(correctAnswer)
  }
  
  const handleAddQuestion = (question) => {
    fetch('http://localhost:4000/questions', {
      method: "POST", 
      headers: {
        "Content-Type": "application/json", 
      }, 
      body: JSON.stringify({
        "prompt": question.prompt, 
        "answers": [
          question.answer1, question.answer2, question.answer3, question.answer4
        ],
        "correctIndex": parseInt(question.correctIndex)
      })
    })
    .then(response => console.log(response.json()))
    .then( newQuestion => 
        setQuestionArray([...questionArray, newQuestion]))
        setPage("List")
  }
  
  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm  handleAddQuestion={handleAddQuestion}/> : <QuestionList onDeleteQuestion={handleDeleteQuestion} questionArray={questionArray} handleAnswer={handleAnswer}/>}
    </main>
  );
}

export default App;



