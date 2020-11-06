import YAML from "yaml";

interface Task {
  task: string;
  author: string;
  title: string;
  words: Word[];
}

interface Word {
  display: string;
  audio: string;
  segments: Segment[];
}

interface Segment {
  correct: boolean;
  chars: string[];
  message: string;
}

export default "";
