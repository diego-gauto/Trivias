export interface ITriviaQuestion {
  id: number;
  question: string;
  imgQuestion: string;
  answers: ITriviaAnswer[];
}

export interface ITriviaAnswer {
  text: string;
  correct: boolean;
}

export interface ITriviaResult {
  title: string;
  body: string;
  img: string;
  idTemplateBrevo: number;
}

export default interface ITrivia {
  imgSelector: string;
  color: string;
  trans: string;
  title: string;
  questions: ITriviaQuestion[];
  result: ITriviaResult[];
}
