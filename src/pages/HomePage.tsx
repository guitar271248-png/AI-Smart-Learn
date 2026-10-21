import React from 'react';
import { ArrowRight, BookOpen, ShieldCheck, Trophy, Sparkles, CheckCircle2, Cpu, Wand2, ShieldAlert, Lock, BarChart3 } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { LESSONS_DATA } from '../data/lessonsData';

interface HomePageProps {
  onNavigate: (tab: string, lessonId?: number) => void;
}

const HERO_IMAGE_PATH = '/src/assets/images/hero_ai_learning_robot_1792598192930.jpg';

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { progress, overallPercentage, isLessonCompleted, currentUser } = useProgress();

  const getLessonIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return Cpu;
      case 'Wand2': return Wand2;
      case 'ShieldAlert': return ShieldAlert;
      case 'Lock': return Lock;
      default: return BookOpen;
    }
  };

  return (
    <div className="space-y-16 py-6 md:py-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 text-white shadow-xl">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-14">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-purple-200">
              <Sparkles className="w-4 h-4 text-purple-300" />
              <span>แพลตฟอร์มเสริมสร้างความฉลาดรู้ด้าน AI (AI Literacy)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              เรียนรู้ AI ให้เป็น <br />
              <span className="bg-gradient-to-r from-purple-300 via-pink-200 to-blue-300 bg-clip-text text-transparent">
                ใช้ AI ให้ฉลาดและปลอดภัย
              </span>
            </h1>

            <p className="text-sm sm:text-base text-purple-100/90 leading-relaxed max-w-xl">
              ในโลกที่ปัญญาประดิษฐ์อยู่รอบตัวเรา การคัดลอกคำตอบไม่ใช่การเรียนรู้! มาร่วมพัฒนาทักษะการรู้เท่าทัน AI ฝึกตั้งคำสั่งที่ทรงพลัง แยกแยะข้อมูลเท็จ และใช้เทคโนโลยีอย่างมีจริยธรรมเพื่ออนาคตของคุณ
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('lessons', 1)}
                className="px-6 py-3.5 rounded-xl bg-purple-500 hover:bg-purple-600 active:scale-95 text-white font-semibold text-sm shadow-lg shadow-purple-500/25 flex items-center gap-2 transition-all cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>เริ่มเรียนรู้บทเรียน</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('quiz')}
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 backdrop-blur-sm transition-all cursor-pointer flex items-center gap-2"
              >
                <Trophy className="w-4 h-4 text-amber-300" />
                <span>ท้าทายความรู้ (Quiz)</span>
              </button>

              <button
                onClick={() => onNavigate('mission')}
                className="px-5 py-3.5 rounded-xl bg-indigo-950/80 hover:bg-indigo-900/90 text-purple-200 font-semibold text-sm border border-purple-500/30 transition-all cursor-pointer flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>ภารกิจนักสืบ AI</span>
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-purple-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>4 บทเรียนกระชับ</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>เกมสถานการณ์จำลอง</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>คลังข้อสอบ 10 ข้อ</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl group">
              <img
                src={HERO_IMAGE_PATH}
                alt="AI Smart Learn Assistant Robot and Students"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs text-white/90 font-medium">
                  ผู้ช่วย AI เพื่อการศึกษา: ออกแบบสำหรับการเรียนรู้ยุคใหม่
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Progress Banner */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-purple-600">สถานะการเรียนรู้ส่วนตัว</span>
              {currentUser ? (
                <span className="text-[11px] font-medium bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  บัญชี: {currentUser.email}
                </span>
              ) : (
                <button
                  onClick={() => onNavigate('auth')}
                  className="text-[11px] font-medium text-purple-700 hover:text-purple-800 underline cursor-pointer"
                >
                  คลิกเพื่อเข้าสู่ระบบด้วยอีเมล
                </button>
              )}
            </div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              ความก้าวหน้าของคุณ (Your Learning Progress)
            </h3>
            <p className="text-xs text-slate-500">
              {currentUser
                ? `บันทึกข้อมูลและผูกผลการเรียนรู้ไว้กับบัญชี ${currentUser.name}`
                : 'บันทึกข้อมูลแบบอัตโนมัติบนเบราว์เซอร์ของคุณ หรือเข้าสู่ระบบเพื่อบันทึกประวัติถาวร'}
            </p>
          </div>

          <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-4">
            <div className="w-full sm:w-56 space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>ความคืบหน้าภาพรวม</span>
                <span className="text-purple-600 font-mono">{overallPercentage}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full transition-all duration-500"
                  style={{ width: `${overallPercentage}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {!currentUser && (
                <button
                  onClick={() => onNavigate('auth')}
                  className="w-full sm:w-auto px-3.5 py-2.5 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
                >
                  เข้าสู่ระบบ
                </button>
              )}
              <button
                onClick={() => onNavigate('dashboard')}
                className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
              >
                ดูสถิติละเอียด →
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-100 text-center">
          <div className="p-3 bg-purple-50/60 rounded-xl">
            <span className="text-[11px] text-purple-700 font-medium">บทเรียนที่จบ</span>
            <p className="text-lg font-bold text-purple-900 font-mono mt-0.5">
              {progress.completedLessons.length} / {LESSONS_DATA.length}
            </p>
          </div>
          <div className="p-3 bg-indigo-50/60 rounded-xl">
            <span className="text-[11px] text-indigo-700 font-medium">ภารกิจนักสืบ</span>
            <p className="text-lg font-bold text-indigo-900 font-mono mt-0.5">
              {progress.missionScore ? `${progress.missionScore.score} แต้ม` : 'ยังไม่ได้เล่น'}
            </p>
          </div>
          <div className="p-3 bg-blue-50/60 rounded-xl">
            <span className="text-[11px] text-blue-700 font-medium">แบบทดสอบล่าสุด</span>
            <p className="text-lg font-bold text-blue-900 font-mono mt-0.5">
              {progress.quizScore ? `${progress.quizScore.score}/${progress.quizScore.total}` : 'ยังไม่ได้ทำ'}
            </p>
          </div>
          <div className="p-3 bg-amber-50/60 rounded-xl">
            <span className="text-[11px] text-amber-700 font-medium">สถานะ</span>
            <p className="text-sm font-bold text-amber-900 mt-1 truncate">
              {overallPercentage === 100 ? 'ผู้รู้เท่าทัน AI สมบูรณ์' : overallPercentage >= 50 ? 'กำลังเชี่ยวชาญ' : 'ผู้เริ่มต้น'}
            </p>
          </div>
        </div>
      </section>

      {/* 4 Core Chapters Section */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-semibold text-purple-600 tracking-wider">หลักสูตรเข้มข้น 4 มิติ</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            เส้นทางการเรียนรู้สู่การเป็น "ผู้รู้เท่าทัน AI"
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            เลือกเรียนรู้ตามลำดับเพื่อความเข้าใจที่ต่อเนื่อง พร้อมแบบฝึกหัดปฏิบัติจริงท้ายบท
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LESSONS_DATA.map((lesson) => {
            const Icon = getLessonIcon(lesson.iconName);
            const completed = isLessonCompleted(lesson.id);

            return (
              <div
                key={lesson.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-medium">{lesson.readTime}</span>
                      {completed && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          เรียนจบแล้ว
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                    {lesson.title}
                  </h3>
                  <p className="text-xs font-medium text-purple-700 mt-1 mb-2">
                    {lesson.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {lesson.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    {lesson.sections.length} หัวข้อย่อย + มินิกิจกรรม
                  </span>
                  <button
                    onClick={() => onNavigate('lessons', lesson.id)}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-purple-600 hover:text-purple-700 cursor-pointer group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>{completed ? 'ทบทวนบทเรียน' : 'เริ่มเรียนบทนี้'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3 Pillars of AI Literacy */}
      <section className="bg-gradient-to-br from-slate-50 to-purple-50/40 rounded-3xl p-8 border border-slate-200/80">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-8">
          <span className="text-xs font-semibold text-purple-600 tracking-wider">ทำไม AI Literacy จึงสำคัญ?</span>
          <h2 className="text-2xl font-bold text-slate-900">3 เสาหลักของการเป็นพลเมืองดิจิทัลยุค AI</h2>
          <p className="text-xs sm:text-sm text-slate-600">
            อ้างอิงตามกรอบมาตรฐานการรู้เท่าทัน AI ของสถาบันข้อมูลขนาดใหญ่ (BDI) และองค์การยูเนสโก (UNESCO)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h4 className="font-bold text-slate-900 text-base">เข้าใจกลไกและข้อจำกัด</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              รู้ว่า AI ไม่ใช่เวทมนตร์ แต่เป็นคณิตศาสตร์และสถิติ สามารถสร้างข้อมูลผิดพลาด (Hallucination) ได้ จึงไม่หลงเชื่อคำตอบง่าย ๆ
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h4 className="font-bold text-slate-900 text-base">ชี้นำและสื่อสารตรงเป้า</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              มีทักษะสร้างสรรค์ Prompt ที่ชัดเจน สามารถประยุกต์ใช้ AI ช่วยทุ่นแรงในการค้นคว้า ระดมสมอง และแก้ปัญหาได้อย่างสร้างสรรค์
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h4 className="font-bold text-slate-900 text-base">จริยธรรมและปกป้องตนเอง</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              เคารพลิขสิทธิ์ ซื่อสัตย์ทางวิชาการ ไม่ลอกผลงาน และปกป้องข้อมูลส่วนบุคคล (PII) ไม่ให้รั่วไหลสู่ระบบสาธารณะ
            </p>
          </div>
        </div>
      </section>

      {/* Call to action card */}
      <section className="bg-purple-600 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-2xl font-bold">พร้อมทดสอบทักษะของคุณแล้วหรือยัง?</h3>
          <p className="text-sm text-purple-100 max-w-xl">
            ท้าทายตนเองในเกมภารกิจนักสืบ AI และแบบทดสอบ 10 ข้อ เพื่อรับประกาศนียบัตรผู้รู้เท่าทัน AI
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('mission')}
            className="px-6 py-3 bg-white text-purple-900 hover:bg-purple-50 rounded-xl font-bold text-sm transition-colors cursor-pointer"
          >
            เล่นเกมภารกิจนักสืบ
          </button>
          <button
            onClick={() => onNavigate('quiz')}
            className="px-6 py-3 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-semibold text-sm border border-purple-400 transition-colors cursor-pointer"
          >
            ทำแบบทดสอบ 10 ข้อ
          </button>
        </div>
      </section>
    </div>
  );
};
