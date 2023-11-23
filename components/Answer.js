import React from "react"

export default function Answer(props){
    const className = {}
    return(
        
            <button
                key = {props.id}
                id = {props.answerId}
                className = {props.className}
                onClick={() => props.handleClick(props.questionId,props.answerText, props.answerId)}
            >
                {props.answerText}
            </button>
        )
}

