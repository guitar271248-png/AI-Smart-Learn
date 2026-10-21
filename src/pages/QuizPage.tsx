import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { useProgress } from '../context/ProgressContext';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  BookOpen,
  Award,
  Sparkles,
  HelpCircle
} from 'lucide-react';

interface QuizPageProps {
  onNavigate: (tab: string, lessonId?: number) => void;
}

const TROPHY_IMG = '/src/assets/images/quiz_trophy_achievement_1792598195014.jpg';

export const QuizPage: React.FC<QuizPageProps> = ({ onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);

  const { saveQuizScore, progress } = useProgress();

  const totalQuestions = QUIZ_QUESTIONS.length;
  const currentQuestion = QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
    setWarningMessage(null);
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null) {
      setWarningMessage('กรุณาเลือกคำตอบ 1 ตัวเลือกก่อนกดยืนยัน');
      return;
    }

    setIsAnswerSubmitted(true);
    if (selectedOption === currentQuestion.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setWarningMessage(null);
    } else {
      // Completed all 10
      setIsFinished(true);
      const finalScore = score;
      saveQuizScore(finalScore, totalQuestions);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsFinished(false);
    setWarningMessage(null);
  };

  const getScoreMessage = (finalScore: number) => {
    const pct = Math.round((finalScore / totalQuestions) * 100);
    if (pct >= 90) {
      return {
        level: 'ระดับยอดเยี่ยม (AI Literacy Master)',
        color: 'text-purple-600',
        bg: 'bg-purple-50 border-purple-200',
        desc: 'ยอดเยี่ยมมาก! คุณมีความรู้ความเข้าใจด้าน AI ในระดับสูงมาก สามารถใช้งาน AI ได้อย่างทรงพลัง ปลอดภัย และมีวิจารณญาณที่เฉียบคม'
      };
    } else if (pct >= 70) {
      return {
        level: 'ระดับดีมาก (Proficient)',
        color: 'text-indigo-600',
        bg: 'bg-indigo-50 border-indigo-200',
        desc: 'ทำได้ดีมาก! คุณมีความฉลาดรู้ด้าน AI พร้อมสำหรับการศึกษาและการทำงานยุคใหม่ ทบทวนเรื่องการตรวจสอบข้อมูลอีกเล็กน้อยจะสมบูรณ์แบบ'
      };
    } else if (pct >= 50) {
      return {
        level: 'ระดับปานกลาง (Developing)',
        color: 'text-amber-600',
        bg: 'bg-amber-50 border-amber-200',
        desc: 'ผ่านเกณฑ์พื้นฐาน! คุณเข้าใจหลักการส่วนใหญ่ แต่ยังมีจุดที่ต้องระวัง เช่น ภาพหลอนของ AI หรือการส่งข้อมูลส่วนตัว แนะนำให้กลับไปทบทวนบทเรียนเพิ่มเติม'
      };
    } else {
      return {
        level: 'กำลังเริ่มต้นเรียนรู้ (Beginner)',
        color: 'text-red-600',
        bg: 'bg-red-50 border-red-200',
        desc: 'อย่ายอมแพ้! AI เป็นเรื่องใหม่ที่ทุกคนต้องเรียนรู้ แนะนำให้กลับไปอ่านบทเรียนทั้ง 4 บทอย่างละเอียด แล้วกลับมาทดสอบใหม่อีกครั้ง'
      };
    }
  };

  return (
    <div className="py-6 md:py-10 space-y-8 max-w-4xl mx-auto">
      {/* Quiz Top Title Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold border border-purple-200">
            <Trophy className="w-4 h-4 text-purple-600" />
            <span>AI Literacy Assessment</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            แบบทดสอบวัดระดับความฉลาดรู้ด้าน AI
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            จำนวน 10 ข้อ ครอบคลุมทั้งการทำงานของ AI, Prompting, การตรวจข้อเท็จจริง และจริยธรรม
          </p>
        </div>

        {progress.quizScore && (
          <div className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 text-center shrink-0">
            <span>คะแนนทดสอบล่าสุด:</span>
            <div className="font-bold text-purple-700 font-mono text-sm">
              {progress.quizScore.score}/{progress.quizScore.total} ({progress.quizScore.percentage}%)
            </div>
          </div>
        )}
      </div>

      {!isFinished ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          {/* Progress bar */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>คำถามข้อที่ {currentIndex + 1} จาก {totalQuestions}</span>
            <span>คะแนนปัจจุบัน: <strong className="text-purple-600 font-mono">{score}</strong>/{currentIndex + (isAnswerSubmitted ? 1 : 0)}</span>
          </div>

          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 transition-all duration-300"
              style={{ width: `${((currentIndex + (isAnswerSubmitted ? 1 : 0)) / totalQuestions) * 100}%` }}
            />
          </div>

          {/* Question text */}
          <div className="pt-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {currentQuestion.id}. {currentQuestion.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              let btnStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';

              if (isAnswerSubmitted) {
                if (idx === currentQuestion.correctIndex) {
                  btnStyle = 'border-emerald-300 bg-emerald-50 text-emerald-950 font-medium';
                } else if (isSelected && idx !== currentQuestion.correctIndex) {
                  btnStyle = 'border-red-300 bg-red-50 text-red-950';
                } else {
                  btnStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                }
              } else if (isSelected) {
                btnStyle = 'border-purple-500 bg-purple-50 text-purple-950 font-medium shadow-xs';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswerSubmitted}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-3 cursor-pointer ${btnStyle} ${
                    isAnswerSubmitted ? 'cursor-default' : ''
                  }`}
                >
                  <div className="w-6 h-6 rounded-full border border-current flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold font-mono">
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <div className="flex-1 text-xs sm:text-sm leading-relaxed">
                    {option}
                  </div>
                </button>
              );
            })}
          </div>

          {warningMessage && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{warningMessage}</span>
            </div>
          )}

          {/* Action button */}
          {!isAnswerSubmitted ? (
            <div className="pt-4 flex justify-end">
              <button
                onClick={handleConfirmAnswer}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-semibold text-sm rounded-xl shadow-sm transition-all cursor-pointer flex items-center gap-2"
              >
                <span>ยืนยันคำตอบ</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="pt-4 space-y-4 animate-fade-in">
              {/* Feedback Explanation */}
              <div className={`p-5 rounded-2xl border ${
                selectedOption === currentQuestion.correctIndex
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-amber-50 border-amber-200 text-amber-950'
              }`}>
                <div className="flex items-center gap-2 font-bold text-sm mb-1.5">
                  {selectedOption === currentQuestion.correctIndex ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span>ถูกต้องยอดเยี่ยม! (+1 คะแนน)</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-amber-600 shrink-0" />
                      <span>ยังไม่ถูกต้อง (คำตอบที่ถูกคือข้อ {String.fromCharCode(65 + currentQuestion.correctIndex)})</span>
                    </>
                  )}
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-700 mt-1">
                  <strong>คำอธิบาย:</strong> {currentQuestion.explanation}
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow-sm transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>{currentIndex < totalQuestions - 1 ? 'ข้อถัดไป' : 'ดูผลคะแนนรวม'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Results View */
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm text-center space-y-8 animate-fade-in">
          <div className="w-24 h-24 mx-auto rounded-3xl overflow-hidden shadow-md border border-purple-100">
            <img
              src={TROPHY_IMG}
              alt="AI Literacy Trophy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-purple-600 tracking-wider">ผลการประเมินความรู้</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              ยินดีด้วย! คุณทำแบบทดสอบครบทั้ง 10 ข้อแล้ว
            </h2>
          </div>

          {/* Score breakdown card */}
          {(() => {
            const badge = getScoreMessage(score);
            const percentage = Math.round((score / totalQuestions) * 100);

            return (
              <div className={`p-6 sm:p-8 rounded-2xl border max-w-lg mx-auto ${badge.bg} text-left space-y-4`}>
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                  <span className="text-xs font-bold text-slate-500">คะแนนรวมที่ได้:</span>
                  <div className="text-right">
                    <span className="text-2xl font-mono font-bold text-purple-700">
                      {score} / {totalQuestions}
                    </span>
                    <span className="text-xs text-slate-500 font-mono ml-2">({percentage}%)</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className={`text-lg font-bold ${badge.color}`}>
                    {badge.level}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-700">
                    {badge.desc}
                  </p>
                </div>
              </div>
            );
          })()}

          {/* Navigation action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={handleRestart}
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-semibold text-sm transition-colors cursor-pointer flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>ทำแบบทดสอบใหม่</span>
            </button>

            <button
              onClick={() => onNavigate('dashboard')}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold text-sm transition-colors cursor-pointer flex items-center gap-2 shadow-sm"
            >
              <Trophy className="w-4 h-4 text-amber-300" />
              <span>ดูแดชบอร์ดความก้าวหน้า</span>
            </button>

            <button
              onClick={() => onNavigate('lessons')}
              className="px-5 py-3 text-purple-600 hover:text-purple-700 font-semibold text-sm cursor-pointer flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4" />
              <span>กลับไปทบทวนบทเรียน</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
