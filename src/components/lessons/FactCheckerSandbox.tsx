import React, { useState } from 'react';
import { Search, AlertTriangle, CheckCircle, ShieldCheck } from 'lucide-react';

interface Scenario {
  id: number;
  statement: string;
  sourceContext: string;
  verdict: 'trust' | 'verify';
  explanation: string;
  warningSigns: string[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    statement: '"จากการวิจัยของ Dr. Johnathan Smith ในวารสาร Bangkok Medical Journal ฉบับปี 2023 ระบุว่า การดื่มน้ำต้มใบกะเพราผสมมะนาวสามารถรักษาโรคเบาหวานให้หายขาดได้ 100% ภายใน 7 วัน"',
    sourceContext: 'สร้างโดย AI เมื่อถามหาวิธีรักษาโรคเบาหวานด้วยสมุนไพรไทย',
    verdict: 'verify',
    explanation: 'ต้องตรวจสอบเพิ่มเติมอย่างเร่งด่วน! คำว่า "รักษาหายขาด 100% ใน 7 วัน" เป็นสัญญาณเตือนรุนแรง (Too good to be true) นอกจากนี้ AI มักสร้างชื่อแพทย์และชื่อวารสารปลอมขึ้นมา โรคเบาหวานเป็นโรคเรื้อรังที่ต้องอยู่ในการดูแลของแพทย์ ห้ามเชื่อข้อมูลสุขภาพที่ไม่ผ่านการยืนยันจากกระทรวงสาธารณสุขเด็ดขาด',
    warningSigns: ['คำกล่าวอ้างว่ารักษาหายขาด 100%', 'ไม่มีการยืนยันในฐานข้อมูลการแพทย์มาตรฐาน', 'ชื่อวารสารอาจถูกกุขึ้นโดย AI']
  },
  {
    id: 2,
    statement: '"ดาวพุธเป็นดาวเคราะห์ที่อยู่ใกล้ดวงอาทิตย์มากที่สุดในระบบสุริยะ และมีระยะเวลาโคจรรอบดวงอาทิตย์ 1 รอบประมาณ 88 วันของโลก"',
    sourceContext: 'AI สรุปข้อมูลดาราศาสตร์พื้นฐานจากคำสั่งช่วยทำการบ้านวิทยาศาสตร์',
    verdict: 'trust',
    explanation: 'ข้อมูลนี้เป็นข้อเท็จจริงทางวิทยาศาสตร์พื้นฐาน (Well-established Scientific Fact) ซึ่งเป็นความรู้สากลที่มีการบันทึกและสอดคล้องกันในทุกตำราดาราศาสตร์ สามารถนำไปใช้ประกอบการเรียนได้โดยมั่นใจในระดับสูง',
    warningSigns: ['เป็นข้อเท็จจริงพื้นฐานที่มีการพิสูจน์แล้ว', 'สอดคล้องกับหลักสูตรดาราศาสตร์สากล']
  },
  {
    id: 3,
    statement: '"อัตราเงินเฟ้อของประเทศไทยในเดือนที่แล้วพุ่งสูงถึง 14.8% ซึ่งเป็นสถิติสูงสุดในรอบ 30 ปี โดยมีสาเหตุหลักมาจากการขึ้นภาษีมูลค่าเพิ่มเป็น 15%"',
    sourceContext: 'AI ตอบคำถามเรื่องสถานการณ์เศรษฐกิจปัจจุบันเมื่อถูกถามย้อนหลัง',
    verdict: 'verify',
    explanation: 'ต้องตรวจสอบด่วน! ตัวเลข 14.8% และการกล่าวอ้างว่าขึ้นภาษี VAT 15% เป็นข้อมูลเท็จที่เกิดจาก AI Hallucination หรือการปะปนข้อมูลต่างประเทศ ข้อมูลเศรษฐกิจและกฎหมายภาษีของไทยต้องตรวจสอบจากเว็บไซต์ธนาคารแห่งประเทศไทย (bot.or.th) หรือกระทรวงการคลังเท่านั้น',
    warningSigns: ['ตัวเลขสถิติผิดปกติรุนแรง', 'การอ้างนโยบายรัฐที่ไม่มีการประกาศจริง', 'AI ขาดข้อมูลเศรษฐกิจเรียลไทม์']
  }
];

export const FactCheckerSandbox: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userChoice, setUserChoice] = useState<'trust' | 'verify' | null>(null);
  const [answered, setAnswered] = useState(false);

  const current = SCENARIOS[currentIndex];

  const handleSelect = (choice: 'trust' | 'verify') => {
    if (answered) return;
    setUserChoice(choice);
    setAnswered(true);
  };

  const handleNext = () => {
    if (currentIndex < SCENARIOS.length - 1) {
      setCurrentIndex((i) => i + 1);
      setUserChoice(null);
      setAnswered(false);
    } else {
      setCurrentIndex(0);
      setUserChoice(null);
      setAnswered(false);
    }
  };

  const isCorrect = userChoice === current.verdict;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <span className="text-xs font-semibold text-purple-600 tracking-wider">จำลองการประเมินข้อเท็จจริง</span>
          <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2 mt-0.5">
            <Search className="w-5 h-5 text-purple-600" />
            สถานการณ์ชวนคิด: "ข้อความนี้ควรเชื่อทันที หรือ ต้องตรวจสอบเพิ่ม?"
          </h4>
        </div>
        <div className="text-xs text-slate-500">
          สถานการณ์ที่ {currentIndex + 1} จาก {SCENARIOS.length}
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="text-xs font-medium text-slate-500">
          บริบท: {current.sourceContext}
        </div>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 leading-relaxed font-medium">
          {current.statement}
        </div>

        {!answered ? (
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleSelect('trust')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border-2 border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold transition-all hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              เชื่อถือได้ทันที (ข้อเท็จจริงพื้นฐาน)
            </button>
            <button
              onClick={() => handleSelect('verify')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border-2 border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-800 font-semibold transition-all hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2"
            >
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              ต้องตรวจสอบเพิ่มเติมด่วน! (มีพิรุธ/ข้อมูลสำคัญ)
            </button>
          </div>
        ) : (
          <div className="pt-2 space-y-4">
            <div className={`p-4 rounded-xl border ${
              isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-amber-50 border-amber-200 text-amber-950'
            }`}>
              <div className="flex items-center gap-2 font-bold text-sm mb-1">
                {isCorrect ? (
                  <>
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <span>การตัดสินใจของคุณถูกต้องยอดเยี่ยม!</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    <span>คำตอบที่รอบคอบกว่าคือ: {current.verdict === 'verify' ? 'ต้องตรวจสอบเพิ่มเติม' : 'เชื่อถือได้'}</span>
                  </>
                )}
              </div>
              <p className="text-xs md:text-sm leading-relaxed text-slate-700 mt-2">
                {current.explanation}
              </p>
              <div className="mt-3 pt-3 border-t border-slate-200/60">
                <p className="text-xs font-semibold text-slate-600 mb-1">สัญญาณประเมิน:</p>
                <div className="flex flex-wrap gap-1.5">
                  {current.warningSigns.map((w, idx) => (
                    <span key={idx} className="text-[11px] bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700">
                      • {w}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleNext}
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer"
              >
                {currentIndex < SCENARIOS.length - 1 ? 'สถานการณ์ถัดไป →' : 'เริ่มทดสอบใหม่อีกรอบ ↺'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
