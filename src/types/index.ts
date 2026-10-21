export interface Lesson {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  readTime: string;
  sections: LessonSection[];
  interactiveComponent?: 'ai-vs-human' | 'prompt-sandbox' | 'fact-checker' | 'privacy-audit';
}

export interface LessonSection {
  title: string;
  content: string[];
  keyTakeaway?: string;
  tips?: string[];
  examples?: {
    bad?: { label: string; text: string; explanation: string };
    good?: { label: string; text: string; explanation: string };
  };
}

export interface MissionOption {
  id: string;
  text: string;
  isCorrect: boolean;
  score: number;
  explanation: string;
}

export interface MissionCase {
  id: number;
  title: string;
  scenario: string;
  category: 'ความถูกต้องของข้อมูล' | 'ความเป็นส่วนตัว' | 'จริยธรรมและลิขสิทธิ์' | 'การรู้เท่าทัน AI';
  options: MissionOption[];
}

export interface QuizQuestion {
  id: number;
  lessonId: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface UserProgress {
  completedLessons: number[];
  missionScore: {
    score: number;
    totalPossible: number;
    date: string;
    rank: string;
  } | null;
  quizScore: {
    score: number;
    total: number;
    percentage: number;
    date: string;
  } | null;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  educationLevel: 'มัธยมศึกษาตอนต้น' | 'มัธยมศึกษาตอนปลาย' | 'อาชีวศึกษา' | 'อุดมศึกษา' | 'ครู/อาจารย์' | 'บุคคลทั่วไป';
  avatarColor: string;
  joinedDate: string;
  lastLoginDate: string;
}

export interface StoredUserAccount extends UserProfile {
  passwordHash: string;
  progress: UserProgress;
}

