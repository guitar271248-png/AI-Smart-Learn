import React, { useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import { LESSONS_DATA } from '../data/lessonsData';
import {
  LayoutDashboard,
  CheckCircle2,
  Clock,
  Award,
  Trophy,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  RotateCcw,
  Sparkles,
  AlertCircle
} from 'lucide-react';

interface DashboardPageProps {
  onNavigate: (tab: string, lessonId?: number) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const { progress, overallPercentage, isLessonCompleted, resetProgress, currentUser } = useProgress();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const completedCount = progress.completedLessons.length;
  const totalLessons = LESSONS_DATA.length;
  const pendingLessons = LESSONS_DATA.filter((l) => !isLessonCompleted(l.id));

  const handleConfirmReset = () => {
    resetProgress();
    setShowResetConfirm(false);
  };

  return (
    <div className="py-6 md:py-10 space-y-8 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold border border-purple-200">
            <LayoutDashboard className="w-4 h-4 text-purple-600" />
            <span>Learning Analytics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
            แดชบอร์ดความก้าวหน้าการเรียนรู้
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {currentUser
              ? `ข้อมูลของบัญชี: ${currentUser.name} (${currentUser.email})`
              : 'ติดตามพัฒนาการทักษะ AI Literacy ของคุณ พร้อมประเมินความพร้อมสู่การเป็นพลเมืองดิจิทัล'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {currentUser ? (
            <button
              onClick={() => onNavigate('auth')}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors cursor-pointer"
            >
              จัดการบัญชีผู้เรียน
            </button>
          ) : (
            <button
              onClick={() => onNavigate('auth')}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 transition-colors cursor-pointer shadow-xs"
            >
              เข้าสู่ระบบด้วยอีเมล
            </button>
          )}

          <button
            onClick={() => setShowResetConfirm(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-red-600 hover:bg-red-50 border border-slate-200 hover:border-red-200 transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>รีเซ็ตประวัติ</span>
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-slate-200 space-y-4 animate-scale-in">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-slate-900">ยืนยันการล้างข้อมูล?</h3>
              <p className="text-xs text-slate-500">
                ประวัติการเรียนจบ คะแนนภารกิจ และคะแนนแบบทดสอบทั้งหมดจะถูกรีเซ็ตเป็นศูนย์
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2 rounded-xl text-xs font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleConfirmReset}
                className="flex-1 py-2 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-700 text-white cursor-pointer"
              >
                ยืนยันรีเซ็ต
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Primary KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">ความคืบหน้ารวม</span>
            <Sparkles className="w-4 h-4 text-purple-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-purple-600">{overallPercentage}%</span>
            <span className="text-xs text-slate-400">จาก 100%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-600 transition-all duration-300"
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">บทเรียนที่เรียนจบ</span>
            <BookOpen className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-slate-900">{completedCount}</span>
            <span className="text-xs text-slate-500">/ {totalLessons} บท</span>
          </div>
          <p className="text-[11px] text-slate-500">
            {completedCount === totalLessons ? 'เรียนครบทุกบทแล้ว ✓' : `เหลืออีก ${totalLessons - completedCount} บท`}
          </p>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">ภารกิจนักสืบ AI</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-slate-900">
              {progress.missionScore ? progress.missionScore.score : '0'}
            </span>
            <span className="text-xs text-slate-500">/ {progress.missionScore ? progress.missionScore.totalPossible : 120} แต้ม</span>
          </div>
          <p className="text-[11px] text-slate-500 truncate">
            {progress.missionScore ? progress.missionScore.rank : 'ยังไม่ได้เริ่มปฏิบัติการ'}
          </p>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">คะแนนแบบทดสอบ</span>
            <Trophy className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-slate-900">
              {progress.quizScore ? `${progress.quizScore.score}/${progress.quizScore.total}` : '-'}
            </span>
            {progress.quizScore && (
              <span className="text-xs text-purple-600 font-mono font-semibold">
                ({progress.quizScore.percentage}%)
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-500">
            {progress.quizScore ? `ทดสอบเมื่อ: ${progress.quizScore.date}` : 'ยังไม่ได้ทำแบบทดสอบ'}
          </p>
        </div>
      </div>

      {/* Main Grid: Pending Lessons & Recommended Next Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Pending Lessons List */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">รายการบทเรียน</h2>
              <p className="text-xs text-slate-500">ความคืบหน้ารายบทเรียนของคุณ</p>
            </div>
            <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full">
              {completedCount} จาก {totalLessons} สำเร็จ
            </span>
          </div>

          <div className="space-y-3">
            {LESSONS_DATA.map((lesson) => {
              const isDone = isLessonCompleted(lesson.id);

              return (
                <div
                  key={lesson.id}
                  className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                    isDone
                      ? 'bg-slate-50/60 border-slate-200/60 opacity-90'
                      : 'bg-white border-purple-200 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      isDone ? 'bg-emerald-100 text-emerald-700' : 'bg-purple-100 text-purple-700'
                    }`}>
                      {isDone ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-4 h-4" />}
                    </div>

                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        {lesson.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        {lesson.subtitle}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('lessons', lesson.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer shrink-0 flex items-center gap-1 ${
                      isDone
                        ? 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                        : 'bg-purple-600 hover:bg-purple-700 text-white shadow-xs'
                    }`}
                  >
                    <span>{isDone ? 'ทบทวน' : 'ไปเรียนต่อ'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Quick Action Cards */}
        <div className="lg:col-span-5 space-y-6">
          {/* AI Detective Action Card */}
          <div className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-purple-200">สถานการณ์จำลอง</span>
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold">ภารกิจนักสืบ AI (6 คดี)</h3>
              <p className="text-xs text-purple-200 leading-relaxed">
                ฝึกตัดสินใจในสถานการณ์ที่มีความเสี่ยงสูง เช่น ข้อมูลส่วนบุคคล ลิขสิทธิ์ และภาพหลอน
              </p>
            </div>

            {progress.missionScore && (
              <div className="p-3 bg-white/10 rounded-xl text-xs space-y-1">
                <span className="text-purple-200">ตำแหน่งปัจจุบัน:</span>
                <p className="font-semibold text-emerald-300">{progress.missionScore.rank}</p>
              </div>
            )}

            <button
              onClick={() => onNavigate('mission')}
              className="w-full py-2.5 bg-white hover:bg-purple-50 text-purple-900 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              {progress.missionScore ? 'เล่นภารกิจอีกครั้ง' : 'เริ่มภารกิจนักสืบเดี๋ยวนี้'}
            </button>
          </div>

          {/* AI Quiz Action Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-purple-600">ประเมินผลความรู้</span>
              <Trophy className="w-5 h-5 text-amber-500" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900">แบบทดสอบ 10 ข้อ</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                ทดสอบความรู้เพื่อวัดคะแนนเปอร์เซ็นต์และรับข้อความประเมินระดับความพร้อม
              </p>
            </div>

            {progress.quizScore && (
              <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 border border-slate-200">
                <span className="text-slate-500">ผลการทำแบบทดสอบล่าสุด:</span>
                <p className="font-bold text-purple-700">
                  {progress.quizScore.score}/{progress.quizScore.total} คะแนน ({progress.quizScore.percentage}%)
                </p>
              </div>
            )}

            <button
              onClick={() => onNavigate('quiz')}
              className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              {progress.quizScore ? 'ทำแบบทดสอบใหม่เพื่อปรับปรุงคะแนน' : 'เริ่มทำแบบทดสอบ 10 ข้อ'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
