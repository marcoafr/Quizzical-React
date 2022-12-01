import React from 'react'

export default function Question(props) {
    const [answers, setAnswers] = React.useState([])
    const [chosenAnswer, setChosenAnswer] = React.useState("")
    const [isClicked, setIsClicked] = React.useState(false)
    const [condition, setCondition] = React.useState(false)
    
    function clickedButton(e) {
        setChosenAnswer(e.target.textContent)
        const newArray = props.chosenAnswersArray
        newArray.push(
            {
                answer: e.target.textContent,
                order: props.order
            })
        // console.log(newArray)
        setIsClicked(true)
    }
    
    // console.log(props.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'")) 
    
    React.useEffect(() => {
        setAnswers([props.correctAnswer, props.htmlDecoder(props.incorrectAnswer[0]), props.htmlDecoder(props.incorrectAnswer[1]), props.htmlDecoder(props.incorrectAnswer[2])].sort((a, b) => 0.5 - Math.random()))
    }, [])
    
    return (
        <div className="question">
            {props.difficulty === 'hard' && <h2 className="question-title red">HARD - {props.question}</h2>}
            {props.difficulty === 'medium' && <h2 className="question-title orange">MEDIUM - {props.question}</h2>}
            {props.difficulty === 'easy' && <h2 className="question-title green">EASY - {props.question}</h2>}
            {isClicked && <p>Chosen Answer: {chosenAnswer}</p>}
            {props.seeResults && 
                <div>
                    <p>Chosen Answer: {
                        props.chosenAnswersArray.filter(el => el.order === props.order)[0].answer
                    }</p>
                    <p>Correct Answer: {props.correctAnswer}</p>
                    <p>{props.chosenAnswersArray.filter(el => el.order === props.order)[0].answer === props.correctAnswer ? "Correct! ✅" : "Wrong ❌"}</p>
                </div>
            }
            {!isClicked && !props.seeResults &&
            <div className="question-options">
                <div>
                    <button className="question-button" onClick={clickedButton} disabled={isClicked}>{answers[0]}</button>
                    <button className="question-button" onClick={clickedButton} disabled={isClicked}>{answers[1]}</button>
                    <button className="question-button" onClick={clickedButton} disabled={isClicked}>{answers[2]}</button>
                    <button className="question-button" onClick={clickedButton} disabled={isClicked}>{answers[3]}</button> 
                </div>
            </div>}
            <hr />
        </div>
    )
}