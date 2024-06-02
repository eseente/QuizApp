import React from 'react';
import { useTheme } from '../theme/ThemeContext';
import { Card, Button, Col } from 'react-bootstrap';

const ExamCard = ({ exam, index, onTakeTest }) => {
  const { theme } = useTheme();

  return (
    <Col md={4} className={`mb-4 ${theme}-theme`}>
      <Card className="h-100 text-center">
        <Card.Body className="d-flex flex-column justify-content-between">
          <Card.Title>Quiz {index + 1}</Card.Title>
          <Button
            variant="primary"
            className="mt-auto"
            onClick={() => onTakeTest(exam.questions)}
          >
            Başla
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ExamCard;
