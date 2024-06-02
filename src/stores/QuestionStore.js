import { makeAutoObservable } from 'mobx';

class QuestionStore {
  questions = [];
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  fetchQuestions = async () => {
    this.loading = true; 
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      this.questions = data.map(question => ({
        ...question,
        answers: question.body.split('\n')
      }));
      this.loading = false;
    } catch (error) {
      console.error("Sorular yüklenirken bir hata oluştu:", error);
      this.loading = false; 
    }
  }
}

export const questionStore = new QuestionStore();
