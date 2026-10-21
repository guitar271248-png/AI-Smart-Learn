import React, { useState, useEffect } from 'react';
import { LESSONS_DATA } from '../data/lessonsData';
import { useProgress } from '../context/ProgressContext';
import {
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Sparkles,
  Cpu,
  Wand2,
  ShieldAlert,
  Lock,
  CheckCircle2,
  ChevronRight,
  Compass,
  Trophy
} from 'lucide-react';
import { AiVsHumanSandbox } from '../components/lessons/AiVsHumanSandbox';
import { PromptSandbox } from '../components/lessons/PromptSandbox';
import { FactCheckerSandbox } from '../components/lessons/FactCheckerSandbox';
import { PrivacyAuditSandbox } from '../components/lessons/PrivacyAuditSandbox';

interface LessonsPageProps {
  initialLessonId?: number;
  onNavigate: (tab: string, lessonId?: number) => void;
}

const PROCESS_FLOW_IMG = '/src/assets/images/diagram_ai_process_flow_1792598195784.jpg';

export const LessonsPage: React.FC<LessonsPageProps> = ({ initialLessonId = 1, onNavigate }) => {
  const [selectedLessonId, setSelectedLessonId] = useState<number>(initialLessonId);
  const { markLessonComplete, isLessonCompleted } = useProgress();

  useEffect(() => {
    if (initialLessonId) {
      setSelectedLessonId(initialLessonId);
    }
  }, [initialLessonId]);

  const currentLesson = LESSONS_DATA.find((l) => l.id === selectedLessonId) || LESSONS_DATA[0];
  const isCompleted = isLessonCompleted(currentLesson.id);

  const getLessonIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return Cpu;
      case 'Wand2': return Wand2;
      case 'ShieldAlert': return ShieldAlert;
      case 'Lock': return Lock;
      default: return BookOpen;
    }
  };

  const handleNextLesson = () => {
    if (selectedLessonId < LESSONS_DATA.length) {
      setSelectedLessonId(selectedLessonId + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevLesson = () => {
    if (selectedLessonId > 1) {
      setSelectedLessonId(selectedLessonId - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCompleteCurrent = () => {
    markLessonComplete(currentLesson.id);
  };

  const renderInteractiveComponent = (type?: string) => {
    switch (type) {
      case 'ai-vs-human':
        return <AiVsHumanSandbox />;
      case 'prompt-sandbox':
        return <PromptSandbox />;
      case 'fact-checker':
        return <FactCheckerSandbox />;
      case 'privacy-audit':
        return <PrivacyAuditSandbox />;
      default:
        return null;
    }
  };

  return (
    <div className="py-6 md:py-8 space-y-8">
      {/* Header bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-purple-600">ห้องเรียนออนไลน์</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-0.5">
            คลังบทเรียน AI Literacy
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            เรียนรู้ 4 หมวดหมู่สำคัญ เพื่อสร้างภูมิคุ้มกันทางเทคโนโลยีและใช้ AI ให้เกิดประโยชน์สูงสุด
          </p>
        </div>

        {/* Quick jump to missions / quiz */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('mission')}
            className="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-semibold border border-indigo-200 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Compass className="w-4 h-4" />
            <span>ภารกิจนักสืบ AI</span>
          </button>
          <button
            onClick={() => onNavigate('quiz')}
            className="px-3.5 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl text-xs font-semibold border border-purple-200 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Trophy className="w-4 h-4 text-purple-600" />
            <span>ทำแบบทดสอบ</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Chapter selector sidebar */}
        <div className="lg:col-span-4 space-y-3 sticky top-24">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <h2 className="text-xs font-bold text-slate-400 tracking-wider px-2 py-1">
              หมวดหมู่บทเรียน (4 บท)
            </h2>
            {LESSONS_DATA.map((lesson) => {
              const Icon = getLessonIcon(lesson.iconName);
              const isActive = lesson.id === selectedLessonId;
              const completed = isLessonCompleted(lesson.id);

              return (
                <button
                  key={lesson.id}
                  onClick={() => {
                    setSelectedLessonId(lesson.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-full text-left p-3.5 rounded-xl transition-all cursor-pointer flex items-start gap-3 border ${
                    isActive
                      ? 'bg-purple-50 border-purple-200 shadow-xs'
                      : 'bg-white border-transparent hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                    isActive ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className={`text-xs font-bold truncate ${isActive ? 'text-purple-900' : 'text-slate-800'}`}>
                        {lesson.title}
                      </span>
                      {completed && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {lesson.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick learning tip */}
          <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100/80 text-xs text-indigo-900 space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              คำแนะนำการเรียนรู้
            </p>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              เมื่ออ่านเนื้อหาจบแต่ละบท ให้ลองทำมินิกิจกรรมท้ายบท แล้วกดปุ่ม "บันทึกว่าเรียนจบแล้ว" เพื่อสะสมความก้าวหน้า
            </p>
          </div>
        </div>

        {/* Right: Main Lesson Content */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 lg:p-10 shadow-sm space-y-8">
            {/* Lesson Title Header */}
            <div className="border-b border-slate-100 pb-6 space-y-3">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <span className="text-xs font-semibold text-purple-600">
                  {currentLesson.readTime}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCompleteCurrent}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isCompleted
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 border border-slate-200'
                    }`}
                  >
                    <CheckCircle className={`w-4 h-4 ${isCompleted ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span>{isCompleted ? 'บันทึกว่าเรียนจบแล้ว ✓' : 'กดเพื่อบันทึกว่าเรียนจบ'}</span>
                  </button>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                {currentLesson.title}
              </h2>
              <p className="text-base text-purple-700 font-medium">
                {currentLesson.subtitle}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                {currentLesson.description}
              </p>
            </div>

            {/* Special Diagram embed for Lesson 1 */}
            {currentLesson.id === 1 && (
              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 space-y-2 p-2">
                <img
                  src={PROCESS_FLOW_IMG}
                  alt="AI Process Flow: Data Ingestion to Output"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover rounded-xl"
                />
                <p className="text-[11px] text-center text-slate-500 py-1 font-medium">
                  แผนภาพสรุปกระบวนการทำงานของ AI: จากข้อมูลดิบ สู่การค้นหาแบบแผนโครงข่ายประสาทเทียม และการตัดสินใจร่วมกับมนุษย์
                </p>
              </div>
            )}

            {/* Sections of the Lesson */}
            <div className="space-y-8">
              {currentLesson.sections.map((sec, idx) => (
                <div key={idx} className="space-y-3 pt-2">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                    <span>{sec.title}</span>
                  </h3>

                  <div className="space-y-2 text-slate-700 text-sm leading-relaxed">
                    {sec.content.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>

                  {sec.keyTakeaway && (
                    <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200/80 text-xs sm:text-sm text-purple-950 font-medium leading-relaxed">
                      💡 <strong>หัวใจสำคัญ:</strong> {sec.keyTakeaway}
                    </div>
                  )}

                  {sec.tips && (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                      <p className="font-semibold text-slate-900">ข้อควรจำเพิ่มเติม:</p>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                        {sec.tips.map((t, tIdx) => (
                          <li key={tIdx}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Interactive Sandbox Activity of this Lesson */}
            {currentLesson.interactiveComponent && (
              <div className="pt-4">
                {renderInteractiveComponent(currentLesson.interactiveComponent)}
              </div>
            )}

            {/* Bottom Lesson Navigation */}
            <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={handlePrevLesson}
                disabled={selectedLessonId === 1}
                className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                  selectedLessonId === 1
                    ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>บทก่อนหน้า</span>
              </button>

              <button
                onClick={handleCompleteCurrent}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isCompleted ? 'เรียนจบแล้ว (คลิกเพื่อบันทึกซ้ำ)' : 'ทำเครื่องหมายว่าเรียนจบแล้ว'}</span>
              </button>

              {selectedLessonId < LESSONS_DATA.length ? (
                <button
                  onClick={handleNextLesson}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>บทถัดไป</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => onNavigate('mission')}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>ไปทำภารกิจนักสืบ AI</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
