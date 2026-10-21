import React, { useState } from 'react';
import { MISSION_CASES } from '../data/missionsData';
import { useProgress } from '../context/ProgressContext';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  Trophy,
  BookOpen,
  Award,
  Sparkles,
  HelpCircle
} from 'lucide-react';

interface MissionGamePageProps {
  onNavigate: (tab: string, lessonId?: number) => void;
}

const BADGE_IMG = '/src/assets/images/lesson_ai_detective_badge_1792598193877.jpg';

export const MissionGamePage: React.FC<MissionGamePageProps> = ({ onNavigate }) => {
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [accumulatedScore, setAccumulatedScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);

  const { saveMissionScore } = useProgress();

  const totalCases = MISSION_CASES.length;
  const currentCase = MISSION_CASES[currentCaseIndex];
  const maxPossibleScore = totalCases * 20;

  const handleSelectOption = (optionId: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionId(optionId);
    setWarningMessage(null);
  };

  const handleConfirmAnswer = () => {
    if (!selectedOptionId) {
      setWarningMessage('กรุณาเลือกคำตอบ 1 ข้อก่อนกดยืนยันการตัดสินใจ');
      return;
    }

    const option = currentCase.options.find((o) => o.id === selectedOptionId);
    if (!option) return;

    setIsAnswerSubmitted(true);
    setAccumulatedScore((prev) => prev + option.score);
  };

  const handleNextCase = () => {
    if (currentCaseIndex < totalCases - 1) {
      setCurrentCaseIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerSubmitted(false);
      setWarningMessage(null);
    } else {
      // Finished
      setIsFinished(true);
      const finalScore = accumulatedScore;
      let rank = 'นักสืบฝึกหัด AI (Novice Detective)';
      if (finalScore >= 100) {
        rank = 'สุดยอดสารวัตรพิทักษ์จริยธรรม AI (Master AI Detective)';
      } else if (finalScore >= 70) {
        rank = 'นักสืบชำนาญการรู้เท่าทัน AI (Senior AI Detective)';
      }
      saveMissionScore(finalScore, maxPossibleScore, rank);
    }
  };

  const handleRestart = () => {
    setCurrentCaseIndex(0);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setAccumulatedScore(0);
    setIsFinished(false);
    setWarningMessage(null);
  };

  const getRankBadge = (score: number) => {
    if (score >= 100) {
      return {
        title: 'สุดยอดสารวัตรพิทักษ์จริยธรรม AI (Master Detective)',
        color: 'text-purple-600',
        bg: 'bg-purple-50 border-purple-200',
        message: 'ยอดเยี่ยมไร้ที่ติ! คุณมีทักษะการตรวจสอบข้อเท็จจริง ปกป้องข้อมูลส่วนบุคคล และยึดมั่นในจริยธรรมดิจิทัลอย่างสมบูรณ์แบบ พร้อมเป็นผู้นำและให้คำแนะนำแก่ผู้อื่น'
      };
    } else if (score >= 70) {
      return {
        title: 'นักสืบชำนาญการรู้เท่าทัน AI (Senior Detective)',
        color: 'text-indigo-600',
        bg: 'bg-indigo-50 border-indigo-200',
        message: 'ทำได้ดีมาก! คุณมีความรอบคอบในการใช้งาน AI สูง หากทบทวนประเด็นด้านลิขสิทธิ์และความเป็นส่วนตัวเพิ่มเติมอีกนิด คุณจะกลายเป็นยอดนักสืบแถวหน้า'
      };
    } else {
      return {
        title: 'นักสืบฝึกหัด AI (Apprentice Detective)',
        color: 'text-amber-600',
        bg: 'bg-amber-50 border-amber-200',
        message: 'เริ่มต้นได้ดี! แต่โลกของ AI มีหลุมพรางมากมาย เช่น ภาพหลอนและความเสี่ยงข้อมูลรั่วไหล แนะนำให้กลับไปทบทวนบทเรียนที่ 3 และ 4 เพื่อเสริมเกราะป้องกัน'
      };
    }
  };

  return (
    <div className="py-6 md:py-10 space-y-8 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden shrink-0 border border-purple-100 shadow-sm">
          <img
            src={BADGE_IMG}
            alt="AI Detective Mission Badge"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 text-center md:text-left space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold border border-purple-200">
            <ShieldCheck className="w-4 h-4 text-purple-600" />
            <span>Interactive Scenario Game</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            เกมภารกิจนักสืบ AI (AI Detective Mission)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            สวมบทบาทเป็น "นักสืบดิจิทัล" ไขคดีสถานการณ์จริง 6 คดี เพื่อฝึกฝนการตัดสินใจอย่างปลอดภัย มีจริยธรรม และรู้เท่าทัน AI
          </p>
        </div>
      </div>

      {!isFinished ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          {/* Progress Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">
                ภารกิจ {currentCaseIndex + 1} จาก {totalCases}
              </span>
              <span className="text-xs text-purple-600 font-semibold bg-purple-50 px-2 py-0.5 rounded border border-purple-100">
                หมวด: {currentCase.category}
              </span>
            </div>
            <div className="text-xs font-semibold text-slate-700">
              คะแนนสะสม: <span className="text-purple-600 font-mono text-sm">{accumulatedScore}</span> แต้ม
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 transition-all duration-300"
              style={{ width: `${((currentCaseIndex + (isAnswerSubmitted ? 1 : 0)) / totalCases) * 100}%` }}
            />
          </div>

          {/* Scenario Description */}
          <div className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              {currentCase.title}
            </h2>
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 text-slate-800 text-sm sm:text-base leading-relaxed">
              {currentCase.scenario}
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-slate-500 tracking-wider">
              ในฐานะนักสืบ AI คุณควรแนะนำหรือตัดสินใจอย่างไร?
            </p>

            <div className="space-y-3">
              {currentCase.options.map((option) => {
                const isSelected = selectedOptionId === option.id;

                let optionStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';

                if (isAnswerSubmitted) {
                  if (option.isCorrect) {
                    optionStyle = 'border-emerald-300 bg-emerald-50 text-emerald-950 font-medium';
                  } else if (isSelected && !option.isCorrect) {
                    optionStyle = 'border-red-300 bg-red-50 text-red-950';
                  } else {
                    optionStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                  }
                } else if (isSelected) {
                  optionStyle = 'border-purple-500 bg-purple-50 text-purple-950 font-medium shadow-xs';
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(option.id)}
                    disabled={isAnswerSubmitted}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-3 cursor-pointer ${optionStyle} ${
                      isAnswerSubmitted ? 'cursor-default' : ''
                    }`}
                  >
                    <div className="w-6 h-6 rounded-full border border-current flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      {option.id.slice(-1).toUpperCase()}
                    </div>
                    <div className="flex-1 text-xs sm:text-sm leading-relaxed">
                      {option.text}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {warningMessage && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{warningMessage}</span>
            </div>
          )}

          {/* Action / Result Feedback */}
          {!isAnswerSubmitted ? (
            <div className="pt-4 flex justify-end">
              <button
                onClick={handleConfirmAnswer}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-semibold text-sm rounded-xl shadow-sm transition-all cursor-pointer flex items-center gap-2"
              >
                <span>ยืนยันการตัดสินใจ</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="pt-4 space-y-4 animate-fade-in">
              {/* Feedback Box */}
              {(() => {
                const chosen = currentCase.options.find((o) => o.id === selectedOptionId);
                if (!chosen) return null;

                return (
                  <div className={`p-5 rounded-2xl border ${
                    chosen.isCorrect
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                      : 'bg-amber-50 border-amber-200 text-amber-950'
                  }`}>
                    <div className="flex items-center gap-2 font-bold text-sm mb-1.5">
                      {chosen.isCorrect ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          <span>การสืบสวนและตัดสินใจถูกต้อง! (+{chosen.score} คะแนน)</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 text-amber-600 shrink-0" />
                          <span>ยังไม่ใช่แนวทางที่ดีที่สุด (+{chosen.score} คะแนน)</span>
                        </>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-700 mt-1">
                      {chosen.explanation}
                    </p>
                  </div>
                );
              })()}

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNextCase}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow-sm transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>{currentCaseIndex < totalCases - 1 ? 'คดีถัดไป' : 'ดูสรุปผลภารกิจ'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Results View */
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm text-center space-y-8 animate-fade-in">
          <div className="w-20 h-20 mx-auto rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shadow-inner">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-purple-600 tracking-wider">สรุปผลการปฏิบัติการ</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              เสร็จสิ้นภารกิจนักสืบ AI ทั้ง 6 คดี!
            </h2>
            <p className="text-slate-600 text-sm">
              คุณได้ผ่านสถานการณ์จำลองเพื่อทดสอบปฏิภาณไหวพริบทางเทคโนโลยีเรียบร้อยแล้ว
            </p>
          </div>

          {/* Score card */}
          {(() => {
            const badge = getRankBadge(accumulatedScore);
            return (
              <div className={`p-6 sm:p-8 rounded-2xl border max-w-lg mx-auto ${badge.bg} text-left space-y-4`}>
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                  <span className="text-xs font-bold text-slate-500">ฉายานักสืบที่ได้รับ:</span>
                  <span className="text-xl font-mono font-bold text-purple-700">
                    {accumulatedScore} / {maxPossibleScore} แต้ม
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className={`text-lg font-bold ${badge.color}`}>
                    {badge.title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-700">
                    {badge.message}
                  </p>
                </div>
              </div>
            );
          })()}

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={handleRestart}
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-semibold text-sm transition-colors cursor-pointer flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>เล่นใหม่อีกครั้ง</span>
            </button>

            <button
              onClick={() => onNavigate('quiz')}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold text-sm transition-colors cursor-pointer flex items-center gap-2 shadow-sm"
            >
              <Trophy className="w-4 h-4 text-amber-300" />
              <span>ไปทำแบบทดสอบ 10 ข้อ</span>
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
