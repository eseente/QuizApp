import React, { useState } from 'react';
import TestComponent from './TestComponent/TestComponent';
import ExamCard from './ExamCard';
import { useTheme } from '../theme/ThemeContext'; 
import { Container, Row } from 'react-bootstrap';

const ExamList = ({ questions }) => {
  const { theme } = useTheme(); 
  const [exams, setExams] = useState(() => {
    const examMap = {};
    questions.forEach(question => {
      if (!examMap[question.userId]) {
        examMap[question.userId] = {
            userId: question.userId,
            questions: []
        };
      }
      examMap[question.userId].questions.push(question);
    });
    return Object.values(examMap);
  });

  const [selectedExamQuestions, setSelectedExamQuestions] = useState(null);
  const [testActive, setTestActive] = useState(false);

  const handleTakeTest = (examQuestions) => {
    setSelectedExamQuestions(examQuestions);
    setTestActive(true);
  };

  const resetTest = () => {
    setTestActive(false);
    setTimeout(() => setTestActive(true), 100);
  };

  const returnToTestList = () => {
    setSelectedExamQuestions(null);
    setTestActive(false);
  };

  if (testActive && selectedExamQuestions) {
    return (
      <TestComponent
        questions={selectedExamQuestions}
        resetTest={resetTest}
        returnToTestList={returnToTestList}
      />
    );
  }

  return (
    <Container className={`${theme}-theme`}>
      <h4 className="text-center">Başlamak için bir quiz seçin:</h4>
      <Row>
        {exams.map((exam, index) => (
          <ExamCard
            key={exam.userId}
            exam={exam}
            index={index}
            onTakeTest={handleTakeTest}
          />
        ))}
      </Row>
    </Container>
  );
};

export default ExamList;
