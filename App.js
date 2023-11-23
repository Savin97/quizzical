import React from "react"
import he from "he"
import {Answer, StartPage, Question} from "./components/index.js"

export default function App(){
    // constants and states, api call
    const question_amount = 8;
    const answer_amount = 4;
    const [startPageActive, setStartPageActive] = React.useState(true); // To check if on StartPage
    const [questionsArray, setQuestionsArray] = React.useState([]); // Holds Question components
    const [answersArray, setAnswersArray] = React.useState([]); // Holds answers for all questions
    const [userAnswers, setUserAnswers] = React.useState({}); // Holds User selected answers
    const [numOfCorrectAnswers, setNumOfCorrectAnswers] = React.useState(0) // For checking victory
    const apiUrl = `https://opentdb.com/api.php?amount=${question_amount}&difficulty=medium&type=multiple`
    // end of section
    
    function showQuestionPage(){
        startPageActive ? setStartPageActive(false) : null
    }
    // Shuffle around answers
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Fetch question data
    React.useEffect( () => {
        fetch(apiUrl)
            .then(function (response) {
                return response.json() // This returns another Promise
            })
                .then(function (data) {
                    console.log("---FETCH RAN---")
                    const tempArray = []
                    // go through temp array and push fetched array
                    for(let i=0; i < question_amount; i++ ){
                        tempArray.push(data.results[i])
                        tempArray[i].incorrect_answers.push(tempArray[i].correct_answer)
                        tempArray[i].id = i
                        }
                    // map over tempArray, shuffle it and set into answersArray
                    tempArray.map( (questionItem) => 
                        {
                            shuffleArray(questionItem.incorrect_answers)
                            // setAnswersArray((prevAnswers) =>{
                            //     return [...prevAnswers, questionItem.incorrect_answers]
                            // } )
                        } )
                    setQuestionsArray(tempArray)
                })
    }, [apiUrl] )
    

    function answerClick(questionID, answerText, answerID){
        const buttonClickedStyle = {
            backgroundColor: "#D6DBF5",
            border: "none"
        }

        console.log("a", questionsArray[questionID].incorrect_answers[answerID])
        // Save answers chosen by user as key-value pair:
        // Key = question number, value = number of answer clicked
        setUserAnswers((prevAnswers) => {
            console.log(answerText, questionID, answerID)
            return {
                ...prevAnswers,
                [questionID] : answerID
            }
        })        
    }

    // Check for victory
    function checkVictory(){
        if(questionsArray.length!=0){
            for(let i = 0; i< question_amount; i++){
                const currentCheck = userAnswers[i]            
                if(currentCheck === questionsArray[i].correct_answer){
                    
                    // TODO: Logic for changing button to green
                    // SetCorrectAnswers
                }
                else{
                    //TODO: Logic for changing button to red
                }
            }
        }
    }
    checkVictory()

    // setQuestionsArray with Question components
    // Map over questionsArray and change each element into a Question component
    const questions = questionsArray.map( (questionItem, questionID) => {
        
        
        const answers = questionItem.incorrect_answers.map( (answer, answerID) => { 
            
            answersArray.push("a",he.decode(answer))
            const className = "answer-btn"
            return <Answer
                key = {answerID}
                questionId = {questionID}
                answerId = {answerID}
                handleClick = {answerClick}
                answerText = {he.decode(answer)}
                className = {className}
                   />
        })

        // Question component should recieve answers array
        return <Question
            key = {questionItem.id}
            questionId = {questionID}
            question = {he.decode(questionItem.question)}
            correct_answer = {he.decode(questionItem.correct_answer)}
            answers = {answers}
            />  
        } )
   
    
    
    return(
        <div className = "container">
            <svg id="lemon-circle" xmlns="http://www.w3.org/2000/svg" width="158" height="141" viewBox="0 0 158 141" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M63.4095 81.3947C35.1213 50.8508 -2.68211 21.7816 1.17274 -19.6933C5.43941 -65.599 39.854 -105.359 82.4191 -123.133C122.797 -139.994 170.035 -130.256 205.822 -105.149C235.947 -84.0141 236.823 -43.8756 246.141 -8.27104C256.17 30.0508 282.521 70.8106 260.501 103.779C237.538 138.159 188.991 143.432 147.931 138.768C112.318 134.723 87.7505 107.677 63.4095 81.3947Z" fill="#FFFAD1"/></svg>
            
            <h1>Correct: {numOfCorrectAnswers}</h1>
            {startPageActive && <StartPage showQuestions = {showQuestionPage} />}
            {!startPageActive && questions}
            
            <svg id="purple-circle" xmlns="http://www.w3.org/2000/svg" width="148" height="118" viewBox="0 0 148 118" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M-5.55191 4.90596C35.9614 1.77498 82.2425 -9.72149 112.306 19.1094C145.581 51.0203 155.282 102.703 142.701 147.081C130.767 189.18 93.7448 220.092 51.8208 232.476C16.5281 242.902 -15.4332 218.605 -49.1007 203.738C-85.3375 187.737 -133.641 182.993 -145.741 145.239C-158.358 105.868 -132.269 64.5881 -103.064 35.3528C-77.7328 9.99541 -41.2727 7.60006 -5.55191 4.90596Z" fill="#DEEBF8"/></svg>    
        </div>
    )
}




/*
    {
        answer_index: 0,
        answer_text: he.decode(questionItem.incorrect_answers[0])
    },
    {
        answer_index:1, answer_text: he.decode(questionItem.incorrect_answers[1])
    },
    {
        answer_index:2, answer_text:he.decode(questionItem.incorrect_answers[2])
    },
    {
        answer_index:3, answer_text:he.decode(questionItem.incorrect_answers[3])
    }

    */