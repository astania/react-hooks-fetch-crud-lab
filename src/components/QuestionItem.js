import React, { useState } from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;
  const [selectedOption, setSelectedOption] = useState(correctIndex)

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleDeleteQuestion = () => {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE",
    })
    .then(r => r.json())
    .then(() => onDeleteQuestion(question))

  }

  const handleCorrectAnswerChange = (e) => {
    
    setSelectedOption(() => e.target.value)

    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        "correctIndex": selectedOption
      })
    })
    .then(r => r.json())
    .then((updatedQuestion) => onUpdateQuestion(updatedQuestion))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select  onChange={handleCorrectAnswerChange} value={selectedOption}>{options}</select>
      </label>
      <button onClick={handleDeleteQuestion}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
