import React, { useState } from 'react';
import { Sparkles, Copy, Check, SlidersHorizontal, ArrowRight, Lightbulb } from 'lucide-react';

const PRESET_TEMPLATES = [
  {
    name: 'สรุปบทเรียนวิทยาศาสตร์',
    role: 'ครูสอนวิทยาศาสตร์ระดับมัธยมที่เชี่ยวชาญการอธิบายเรื่องยากให้เห็นภาพชัดเจน',
    task: 'ช่วยสรุปเนื้อหาเรื่อง "การสังเคราะห์ด้วยแสงของพืช"',
    context: 'สำหรับนักเรียนชั้น ม.2 ที่กำลังเตรียมตัวสอบปลายภาค โดยเน้นจุดที่เด็กมักเข้าใจผิด',
    format: 'แบ่งเป็น 3 ประเด็นสำคัญ ใช้ภาษาเข้าใจง่าย พร้อมทำตารางเปรียบเทียบระหว่างปฏิกิริยาใช้แสงและไม่ใช้แสง'
  },
  {
    name: 'ตรวจทานบทความภาษาอังกฤษ',
    role: 'อาจารย์เจ้าของภาษาผู้เชี่ยวชาญด้านวิชาการ (Academic Writing Specialist)',
    task: 'ช่วยตรวจแก้ไวยากรณ์และเสนอคำศัพท์ที่สละสลวยขึ้นในย่อหน้าต่อไปนี้',
    context: 'สำหรับบทคัดย่อโครงงานวิจัยระดับมัธยมปลาย เพื่อส่งประกวดแข่งขันระดับนานาชาติ',
    format: 'แสดงจุดที่แก้ไขพร้อมอธิบายเหตุผลสั้น ๆ และทำรายการสรุปคำศัพท์ขั้นสูงที่แนะนำเพิ่มเติม'
  },
  {
    name: 'ระดมไอเดียโครงงานเพื่อสังคม',
    role: 'ที่ปรึกษานวัตกรรมเพื่อความยั่งยืน (Social Innovation Consultant)',
    task: 'ช่วยระดมไอเดีย 5 แนวคิดในการลดขยะพลาสติกในโรงอาหารของโรงเรียน',
    context: 'มีงบประมาณจำกัดไม่เกิน 3,000 บาท และต้องการให้นักเรียนมีส่วนร่วมอย่างสนุกสนาน',
    format: 'เขียนเป็นข้อ 1-5 พร้อมระบุ วัตถุประสงค์, วิธีดำเนินกิจกรรม, และผลลัพธ์ที่คาดหวัง'
  }
];

export const PromptSandbox: React.FC = () => {
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);
  const [role, setRole] = useState(PRESET_TEMPLATES[0].role);
  const [task, setTask] = useState(PRESET_TEMPLATES[0].task);
  const [context, setContext] = useState(PRESET_TEMPLATES[0].context);
  const [format, setFormat] = useState(PRESET_TEMPLATES[0].format);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'builder' | 'comparison'>('comparison');

  const handleSelectTemplate = (idx: number) => {
    setSelectedTemplateIndex(idx);
    setRole(PRESET_TEMPLATES[idx].role);
    setTask(PRESET_TEMPLATES[idx].task);
    setContext(PRESET_TEMPLATES[idx].context);
    setFormat(PRESET_TEMPLATES[idx].format);
  };

  const fullPrompt = `คุณคือ ${role} ${task} ${context} โดยขอให้ ${format}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <span className="text-xs font-semibold text-purple-600 tracking-wider">ห้องทดลองปฏิบัติจริง</span>
          <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2 mt-0.5">
            <Sparkles className="w-5 h-5 text-purple-600" />
            Prompt Engineering Sandbox: สร้างคำสั่งระดับมือโปร
          </h4>
        </div>
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs">
          <button
            onClick={() => setViewMode('comparison')}
            className={`px-3 py-1.5 font-medium rounded-md transition-colors cursor-pointer ${
              viewMode === 'comparison' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            เปรียบเทียบผลลัพธ์
          </button>
          <button
            onClick={() => setViewMode('builder')}
            className={`px-3 py-1.5 font-medium rounded-md transition-colors cursor-pointer ${
              viewMode === 'builder' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            เครื่องมือฝึกประกอบ Prompt (R-T-C-F)
          </button>
        </div>
      </div>

      {viewMode === 'comparison' ? (
        <div className="mt-6 space-y-6">
          <p className="text-sm text-slate-600">
            ดูความแตกต่างอย่างชัดเจนระหว่างการสั่งแบบคลุมเครือ (Prompt ทั่วไป) กับการสั่งโดยระบุบทบาท บริบท และรูปแบบที่ชัดเจน (Prompt คุณภาพสูง):
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Bad Prompt Card */}
            <div className="p-5 rounded-xl border border-red-200 bg-red-50/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded">✕ คำสั่งคลุมเครือ</span>
                  <span className="text-xs text-red-500">ผลลัพธ์กว้างและไม่ตรงจุด</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-red-100 font-mono text-xs text-slate-800 mb-3">
                  "ช่วยสรุปประวัติศาสตร์อยุธยาให้หน่อย เอาสั้น ๆ นะ"
                </div>
                <div className="text-xs text-slate-600 space-y-1.5 border-t border-red-100 pt-3">
                  <p className="font-semibold text-slate-800">ผลลัพธ์ที่ AI มักจะตอบกลับมา:</p>
                  <p className="italic bg-white/70 p-2.5 rounded border border-slate-200/60 leading-relaxed text-slate-700">
                    "กรุงศรีอยุธยาเป็นราชธานีของไทยก่อตั้งขึ้นในปี พ.ศ. 1893 มีกษัตริย์ปกครอง 33 พระองค์ มีความเจริญรุ่งเรืองด้านการค้ากับต่างประเทศ และสิ้นสุดลงในปี พ.ศ. 2310..."
                  </p>
                  <p className="text-red-700 pt-1 text-[11px]">
                    ⚠️ ข้อเสีย: สั้นเกินไป ไม่มีประเด็นสำคัญสำหรับใช้อ่านสอบ และไม่ได้บอกแง่มุมที่ต้องการเรียนรู้
                  </p>
                </div>
              </div>
            </div>

            {/* Good Prompt Card */}
            <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">✓ คำสั่งที่มีโครงสร้างชัดเจน</span>
                  <span className="text-xs text-emerald-600">ผลลัพธ์ตรงเป้าและนำไปใช้ได้ทันที</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-emerald-100 font-mono text-xs text-slate-800 mb-3">
                  "คุณคือครูสอนประวัติศาสตร์ ช่วยสรุป 3 ปัจจัยหลักที่ทำให้อยุธยาเป็นศูนย์กลางการค้าทางทะเลในเอเชีย สำหรับนักเรียนชั้น ม.3 เพื่อใช้ตอบคำถามสั้นในการสอบ โดยเขียนเป็นข้อสรุปกระชับ มีตัวอย่างสินค้าสำคัญ 2 ชนิด"
                </div>
                <div className="text-xs text-slate-600 space-y-1.5 border-t border-emerald-100 pt-3">
                  <p className="font-semibold text-slate-800">ผลลัพธ์ที่ AI จะตอบกลับมา:</p>
                  <div className="italic bg-white/70 p-2.5 rounded border border-slate-200/60 leading-relaxed text-slate-700 space-y-1">
                    <p>1. <strong>ทำเลที่ตั้งยุทธศาสตร์:</strong> อยู่ใกล้ปากอ่าวไทย เรือสินค้าแล่นเข้าถึงได้สะดวก ปลอดภัยจากมรสุม</p>
                    <p>2. <strong>เครือข่ายแม่น้ำ 3 สาย:</strong> ลำเลียงสินค้าจากหัวเมืองตอนบนสู่ทะเลได้ง่าย</p>
                    <p>3. <strong>นโยบายเปิดรับชาวต่างชาติ:</strong> ตั้งย่านการค้าเสรี (สินค้าสำคัญ เช่น ไม้กฤษณา, ช้าง, เครื่องถ้วยชาม)</p>
                  </div>
                  <p className="text-emerald-700 pt-1 text-[11px]">
                    ✨ จุดเด่น: มีสาระครบถ้วน นำไปทบทวนสอบได้ทันที มีตัวอย่างเฉพาะเจาะจง
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-6 space-y-5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-slate-600">เลือกตัวอย่างแม่แบบ:</span>
            {PRESET_TEMPLATES.map((tmpl, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectTemplate(idx)}
                className={`text-xs px-2.5 py-1 rounded-md transition-colors cursor-pointer border ${
                  selectedTemplateIndex === idx
                    ? 'bg-purple-100 border-purple-300 text-purple-900 font-semibold'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {tmpl.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-purple-900 mb-1">
                1. Role (บทบาทที่ให้ AI สวม):
              </label>
              <textarea
                value={role}
                onChange={(e) => setRole(e.target.value)}
                rows={2}
                className="w-full text-xs p-2.5 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-purple-50/30"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-blue-900 mb-1">
                2. Task (งานหลักที่ต้องการให้ทำ):
              </label>
              <textarea
                value={task}
                onChange={(e) => setTask(e.target.value)}
                rows={2}
                className="w-full text-xs p-2.5 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/30"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-teal-900 mb-1">
                3. Context (บริบทและเป้าหมาย):
              </label>
              <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                rows={2}
                className="w-full text-xs p-2.5 rounded-lg border border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-teal-50/30"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-amber-900 mb-1">
                4. Format & Constraints (รูปแบบและข้อจำกัด):
              </label>
              <textarea
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                rows={2}
                className="w-full text-xs p-2.5 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-amber-50/30"
              />
            </div>
          </div>

          <div className="p-4 bg-slate-900 text-white rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-300">Prompt สำเร็จรูปที่ประกอบได้:</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded text-purple-300 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'คัดลอกแล้ว!' : 'คัดลอกคำสั่ง'}
              </button>
            </div>
            <p className="text-xs md:text-sm font-sans leading-relaxed text-slate-200">
              <span className="text-purple-300">คุณคือ {role}</span>{' '}
              <span className="text-blue-300">{task}</span>{' '}
              <span className="text-teal-300">{context}</span>{' '}
              <span className="text-amber-300">โดยขอให้ {format}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
