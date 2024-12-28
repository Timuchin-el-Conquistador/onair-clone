


import { type Media } from "../../utils/dtos/media";

  export interface Test {
    _id: string;
    title: string;
    caption: string;
    media: Media;
  };

  export  interface Question  {
    type: "multiple" | "single";
    options: [string];
    answers: [number]; // indexes
    question: string;
    media: Media;
  };