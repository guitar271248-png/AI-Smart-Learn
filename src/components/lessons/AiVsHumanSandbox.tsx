import React, { useState } from 'react';
import { CheckCircle2, XCircle, Sparkles, HelpCircle } from 'lucide-react';

interface QuestionItem {
  id: number;
  snippet: string;
  creator: 'ai' | 'human';
  explanation: string;
  clues: string[];
}

const ITEMS: QuestionItem[] = [
  {
    id: 1,
    snippet: '"ในค่ำคืนที่เงียบสงัด เสียงจักจั่นเรไรในสวนหลังบ้านยังคงกังวานเหมือนทุกครั้งที่ผมกลับมาเยี่ยมแม่ กลิ่นแกงส้มสายบัวฝีมือแม่ที่เคี่ยวในเตาถ่านลอยแตะจมูก มันคือความอบอุ่นที่ห่างหายไปเกือบสิบปี..."',
    creator: 'human',
    explanation: 'ข้อความนี้เขียนโดยมนุษย์: มีการใช้ความรู้สึกจากประสบการณ์สัมผัสจริง (กลิ่นแกงส้มเตาถ่าน, ความผูกพันกับแม่) และอารมณ์ความถวิลหา (Nostalgia) ซึ่งสะท้อนความทรงจำส่วนบุคคลเฉพาะตัว',
    clues: ['ความทรงจำส่วนบุคคลเฉพาะเจาะจง', 'ความรู้สึกผูกพันทางอารมณ์ที่ลึกซึ้ง']
  },
  {
    id: 2,
    snippet: '"เทคโนโลยีปัญญาประดิษฐ์มีบทบาทสำคัญอย่างยิ่งต่อการพัฒนาประเทศในยุคปัจจุบัน ทั้งนี้ การนำปัญญาประดิษฐ์มาประยุกต์ใช้อย่างมีประสิทธิภาพ จำเป็นต้องอาศัยการบูรณาการความร่วมมือจากทุกภาคส่วนที่เกี่ยวข้อง..."',
    creator: 'ai',
    explanation: 'ข้อความนี้สร้างโดย AI: มีรูปแบบประโยคที่สมบูรณ์แบบแต่ค่อนข้างทั่วไป (Formulaic), การใช้คำเชื่อมทางการซ้ำ ๆ เช่น "ทั้งนี้", "ประยุกต์ใช้อย่างมีประสิทธิภาพ", "บูรณาการความร่วมมือ" และขาดมุมมองตัวอย่างที่เป็นรูปธรรม',
    clues: ['สำนวนภาษาแบบทางการกึ่งราชการที่สมมาตร', 'ใจความทั่วไปขาดตัวอย่างเฉพาะเจาะจง']
  },
  {
    id: 3,
    snippet: '"เมื่อวานลืมเอาร่มไป คิดว่าฝนคงไม่ตกที่ไหนได้ เปียกโชกเป็นลูกหมาตกน้ำเลย เกือบเป็นหวัดแนะ ดีนะกินยาดักไว้ก่อน"',
    creator: 'human',
    explanation: 'ข้อความนี้เขียนโดยมนุษย์: มีความเป็นภาษาพูดตามธรรมชาติ การใช้สำนวนอุปมาอุปไมยแบบไทย ("เปียกโชกเป็นลูกหมาตกน้ำ", "กินยาดักไว้") ซึ่งสะท้อนวิถีชีวิตจริง',
    clues: ['ภาษาพูดและสำนวนตามธรรมชาติ', 'เหตุการณ์ฉับพลันในชีวิตประจำวัน']
  }
];

export const AiVsHumanSandbox: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedGuess, setSelectedGuess] = useState<'ai' | 'human' | null>(null);
  const [score, setScore] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const current = ITEMS[currentIndex];

  const handleGuess = (guess: 'ai' | 'human') => {
    if (revealed) return;
    setSelectedGuess(guess);
    setRevealed(true);
    if (guess === current.creator) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < ITEMS.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedGuess(null);
      setRevealed(false);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedGuess(null);
    setRevealed(false);
    setScore(0);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <span className="text-xs font-semibold text-purple-600 tracking-wider">มินิกิจกรรมท้ายบท</span>
          <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2 mt-0.5">
            <Sparkles className="w-5 h-5 text-purple-500" />
            ฝึกจับสังเกต: "ข้อความนี้ AI หรือ มนุษย์เป็นคนเขียน?"
          </h4>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span>ข้อ {currentIndex + 1} จาก {ITEMS.length}</span>
          <span aria-hidden="true">·</span>
          <span className="font-semibold text-purple-700">ทายถูก {score}/{ITEMS.length}</span>
        </div>
      </div>

      <div className="mt-6">
        <div className="p-5 bg-slate-50 rounded-xl border border-slate-200/80 text-slate-800 leading-relaxed text-base italic">
          {current.snippet}
        </div>

        {!revealed ? (
          <div className="mt-6">
            <p className="text-sm font-medium text-slate-700 mb-3 text-center">คุณคิดว่าใครเป็นผู้สร้างข้อความนี้?</p>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <button
                onClick={() => handleGuess('ai')}
                className="py-3 px-4 rounded-xl border-2 border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-800 font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                🤖 สร้างโดย AI
              </button>
              <button
                onClick={() => handleGuess('human')}
                className="py-3 px-4 rounded-xl border-2 border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                🧑 มนุษย์เขียนเอง
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-6 space-y-4 animate-fade-in">
            <div className={`p-4 rounded-xl flex items-start gap-3 ${
              selectedGuess === current.creator ? 'bg-emerald-50 border border-emerald-200 text-emerald-900' : 'bg-amber-50 border border-amber-200 text-amber-900'
            }`}>
              {selectedGuess === current.creator ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-bold text-sm">
                  {selectedGuess === current.creator ? 'ถูกต้องเก่งมาก!' : 'ยังไม่ตรงเท่าไหร่ ลองมาดูเหตุผลกัน'}
                  {' '}(เฉลยคือ: {current.creator === 'ai' ? 'สร้างโดย AI 🤖' : 'มนุษย์เขียนเอง 🧑'})
                </p>
                <p className="text-xs md:text-sm mt-1 leading-relaxed opacity-90">{current.explanation}</p>
                <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-medium text-slate-600">จุดสังเกต:</span>
                  {current.clues.map((clue, idx) => (
                    <span key={idx} className="bg-white/80 px-2 py-0.5 rounded border border-slate-200 text-slate-700">
                      {clue}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              {currentIndex < ITEMS.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer"
                >
                  ข้อถัดไป →
                </button>
              ) : (
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer"
                >
                  ลองฝึกใหม่อีกครั้ง ↺
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
