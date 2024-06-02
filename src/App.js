import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { ThemeProvider, useTheme } from './theme/ThemeContext';
import { questionStore } from './stores/QuestionStore';
import ExamList from './components/ExamList';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles.css';

const App = observer(() => {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    document.body.classList.toggle('dark-theme', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    questionStore.fetchQuestions();
  }, []);

  if (questionStore.loading) {
    return <div className={`text-center ${theme}-theme`}>Sorular yükleniyor...</div>;
  }

  return (
    <div className={`${theme}-theme`}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            <h1 style={{position:'absolute', top:'2%', left:0, right:0}} className="text-center mb-4">QUIZ APP</h1>
            <Button 
              style={{position:"absolute", right: "2%", top: "2%"}}
              onClick={toggleTheme} 
              className="theme-toggle-btn btn"
            >
              <i style={{fontSize: 32}} className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
            </Button>
            <ExamList questions={questionStore.questions} />
          </Col>
        </Row>
      </Container>
    </div>
  );
});

export default () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
