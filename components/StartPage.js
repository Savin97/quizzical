import React from "react"

export default function StartPage(props){
    return(
        <div id="start-container">
            <h1>Quizzical</h1>
            <h2>The best trivia game on this URL!</h2>
            <button onClick = {props.showQuestions} >Start Quiz</button>
        </div>
    )
}