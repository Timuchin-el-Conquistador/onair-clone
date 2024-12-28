export interface Answer {
    question: string;
    answers: number[];
    type:'single'|'multiple';
  }
export interface TestSubmitForm {
  answers: Answer[];
  score:number
}