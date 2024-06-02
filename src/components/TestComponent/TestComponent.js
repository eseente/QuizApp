import React, { useState, useEffect } from 'react';
import QuestionCard from '../QuestionCard';
import { Container, ListGroup, Button } from 'react-bootstrap';
import "./styles.css"

const TestComponent = ({ questions, resetTest, returnToTestList }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [isClickable, setIsClickable] = useState(false);
    const [timer, setTimer] = useState(30);
    const [testComplete, setTestComplete] = useState(false);
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

    useEffect(() => {
        const countdown = setInterval(() => {
            if (timer > 0) {
                setTimer(timer - 1);
            }
        }, 1000);

        return () => clearInterval(countdown);
    }, [timer]);

    useEffect(() => {
        setTimer(30);
        setIsClickable(false);

        const enableClick = setTimeout(() => {
            setIsClickable(true);
        }, 10000);

        return () => clearTimeout(enableClick);
    }, [currentQuestionIndex]);

    useEffect(() => {
        if (timer === 0) {
            const existingAnswerIndex = answers.findIndex(ans => ans.questionId === questions[currentQuestionIndex].id);
            if (existingAnswerIndex === -1) {
                setAnswers([...answers, { questionId: questions[currentQuestionIndex].id, answer: "-" }]);
            }
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                setTestComplete(true);
            }
        }
    }, [timer, questions.length]);

    const handleAnswerSelect = (id, answer) => {
        if (!isClickable) return;
        const existingAnswerIndex = answers.findIndex(ans => ans.questionId === questions[currentQuestionIndex].id);
        const newAnswer = { questionId: questions[currentQuestionIndex].id, answer };

        if (existingAnswerIndex >= 0) {
            const updatedAnswers = answers.slice();
            updatedAnswers[existingAnswerIndex] = newAnswer;
            setAnswers(updatedAnswers);
        } else {
            setAnswers([...answers, newAnswer]);
        }
    };

    const isLastQuestionAnswered = () => {
        const lastQuestionId = questions[questions.length - 1].id;
        return answers.some(answer => answer.questionId === lastQuestionId);
    };

    const handleReset = () => {
        resetValues();
        resetTest();
    };

    const handleReturnHome = () => {
        resetValues();
        returnToTestList();
    };

    const resetValues = () => {
        setCurrentQuestionIndex(0);
        setAnswers([]);
    };

    if (testComplete) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Container style={{ width: 600, display:'flex', flexDirection:'column'}}>
                    <h2 className="text-center">Quiz Sonuçları</h2>
                    <ListGroup style={{width:150, alignSelf:'center', display:'flex'}}>
                    {answers.map((item, index) => (
                        <ListGroup.Item key={index}>
                        Soru {index + 1}: {item.answer}
                        </ListGroup.Item>
                    ))}
                    </ListGroup>
                    <div style={{alignItems:'center', display:'flex', alignSelf:'center', width:150, justifyContent:'space-between'}} className="d-flex mt-3">
                        <Button variant="primary" onClick={handleReset}>
                            <i style={{fontSize: 22,padding:5}} class="fa-solid fa-rotate-right"></i>
                        </Button>
                        <Button variant="secondary" onClick={handleReturnHome}>
                            <i style={{fontSize: 22,padding:5}} class="fa-solid fa-house"></i>
                        </Button>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Container style={{ height: 400, width: 600}}>
                {questions.length > 0 ? (
                    <>
                        <div className="mb-3">
                            <strong>Soru <h4 className="d-inline">{currentQuestionIndex + 1}</h4>/{questions.length}</strong>
                            <br />
                            <div className={`timer ${timer <= 8 ? 'urgent' : ''}`}>
                                <i className="fa fa-clock"></i> {timer} saniye kaldı
                            </div>
                        </div>
                        <div className="progress" style={{ height: '15px', marginBottom:5 }}>
                            <div
                                className="progress-bar"
                                role="progressbar"
                                style={{
                                    width: `${progressPercentage}%`,
                                    backgroundColor: isLastQuestionAnswered() ? 'green' : 'blue'
                                }}
                                aria-valuenow={progressPercentage}
                                aria-valuemin="0"
                                aria-valuemax="100"
                            >
                            </div>
                        </div>
                        <QuestionCard
                            question={questions[currentQuestionIndex].title}
                            answers={questions[currentQuestionIndex].answers}
                            onAnswerSelect={handleAnswerSelect}
                            isClickable={isClickable}
                        />
                    </>
                ) : (
                    <div>Soru bulunamadı.</div>
                )}
            </Container>
        </div>
    );
};

export default TestComponent;
