import React from "react"

export default function Question(props){
    return(
        <div className="question-all-container">
            <div className = "question-container">
                <h2>{props.question}</h2>
                <div className="answer-div">
                    {props.answers}
                </div>
                <div>
                    {props.correct_answer}
                </div>
            <div className = "separator-line"></div>
            </div>
        </div>
    )
}

/*

import React from "react"

export default function Question(props){
    const buttons = [] 
    for(let i = 0; i < 4; i++){
        let answerNum = `answer${i}`
        const renderButton = (answerNum) => (
            <button
                key = {i}
                id = {i}
                className = "answer-btn"
                onClick={ () => {
                    props.answerClick(props.questionId, props.answers[answerNum].answer_text)
                    }
                }
            >
            {props.answers[answerNum].answer_text}
            </button>
        );
        buttons.push(renderButton(answerNum));
    }
            
    return(
        <div className="question-all-container">
            <div className = "question-container">
                <h2>{props.question}</h2>
                <div className="answer-div">
                    {buttons}
                </div>
                <div>
                 {props.correct_answer}
                </div>
            <div className = "separator-line"></div>
            </div>
        </div>
    )
}

*/