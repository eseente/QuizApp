import React, { useEffect, useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';

function QuestionCard({ id, question, answers, onAnswerSelect, isClickable }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const answerLabels = ['A', 'B', 'C', 'D'];

  const handleAnswerChange = (label, answerText) => {
    if (!isClickable) return; 
    setSelectedAnswer(label);
    onAnswerSelect(id, label);
  };

  useEffect(() => {
    setSelectedAnswer(null);
  }, [isClickable]);

  return (
    <Card>
      <Card.Header><strong>{question}</strong></Card.Header>
      <ListGroup variant="flush">
        {answers.map((answer, index) => (
          <ListGroup.Item 
            key={index}
            className={selectedAnswer === answerLabels[index] ? 'bg-primary text-white' : ''}
            onClick={() => handleAnswerChange(answerLabels[index], answer)}
            style={{ cursor: isClickable ? 'pointer' : 'not-allowed' }}>
            <strong>{answerLabels[index]})</strong> {answer}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
}

export default QuestionCard;
