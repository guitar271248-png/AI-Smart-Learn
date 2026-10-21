import React from 'react';
import { Sparkles, Target, Users, CheckCircle, ExternalLink, BookMarked, Shield } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-6 md:py-10 space-y-10 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold border border-purple-200">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span>รายละเอียดโครงงานเพื่อการศึกษา</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-900">
          เกี่ยวกับโครงงาน AI Smart Learn
        </h1>
        <p className="text-sm text-purple-700 font-medium">
          “เรียนรู้ AI ให้เป็น ใช้ AI ให้ฉลาด และปลอดภัย”
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
          นวัตกรรมเว็บแอปพลิเคชันเพื่อการเรียนรู้แบบมีปฏิสัมพันธ์ (Interactive Learning) มุ่งพัฒนาความฉลาดรู้ด้านปัญญาประดิษฐ์ (AI Literacy) ให้แก่เยาวชน นักเรียน และนักศึกษาไทย
        </p>
      </div>

      {/* Principles & Rationale */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
          <BookMarked className="w-5 h-5 text-purple-600" />
          หลักการและเหตุผล (Principles & Rationale)
        </h2>
        <div className="space-y-3 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <p>
            การก้าวกระโดดของเทคโนโลยีปัญญาประดิษฐ์ โดยเฉพาะ Generative AI และ Large Language Models (LLMs) เช่น ChatGPT, Gemini, และ Claude ได้เปลี่ยนโฉมวิถีการเรียนรู้และการทำงานทั่วโลกอย่างรวดเร็ว อย่างไรก็ตาม การเข้าถึงเครื่องมือเหล่านี้โดยขาดความรู้ความเข้าใจอย่างลึกซึ้ง (Lack of AI Literacy) นำมาซึ่งความท้าทายและผลกระทบร้ายแรงหลายประการ:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600">
            <li><strong>การหลงเชื่อข้อมูลเท็จ (AI Hallucination):</strong> ผู้เรียนมักเชื่อข้อมูลและตัวเลขที่ AI สร้างขึ้นโดยไม่มีการตรวจสอบแหล่งที่มา</li>
            <li><strong>ความเสี่ยงต่อความเป็นส่วนตัว (Privacy & PII Leakage):</strong> การส่งเลขบัตรประชาชน หรือข้อมูลสำคัญลงใน AI สาธารณะ</li>
            <li><strong>การละเมิดความซื่อสัตย์ทางวิชาการ (Academic Dishonesty):</strong> การคัดลอกคำตอบไปส่งเป็นการบ้านโดยไม่อ่านหรือทำความเข้าใจ</li>
            <li><strong>การสูญเสียทักษะการคิดวิเคราะห์ (Loss of Critical Thinking):</strong> การพึ่งพา AI ทุกขั้นตอนจนสมองขาดการฝึกฝนตั้งคำถาม</li>
          </ul>
          <p>
            เว็บไซต์แอปพลิเคชัน <strong>“AI Smart Learn”</strong> จึงถูกพัฒนาขึ้นเพื่อเป็นเครื่องมือการเรียนรู้ที่ไม่เพียงแต่อธิบายว่า AI คืออะไร แต่ยังฝึกปฏิบัติให้ผู้เรียนสามารถตั้งคำสั่งอย่างมีประสิทธิภาพ ตรวจสอบข้อเท็จจริง และตระหนักถึงจริยธรรมในการใช้งาน
          </p>
        </div>
      </section>

      {/* Objectives & Target Group */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Objectives */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            วัตถุประสงค์ของเว็บไซต์
          </h2>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>เพื่อสร้างความเข้าใจที่ถูกต้องเกี่ยวกับหลักการทำงานและข้อจำกัดของปัญญาประดิษฐ์</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>เพื่อฝึกฝนทักษะการเขียนคำสั่ง (Prompt Engineering) ให้เกิดประสิทธิภาพสูงสุดทางการศึกษา</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>เพื่อส่งเสริมทักษะการตรวจสอบข้อเท็จจริง (Fact-Checking) และรู้เท่าทันข้อมูลที่ AI แต่งขึ้น</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>เพื่อปลูกฝังจริยธรรม ความซื่อสัตย์ทางวิชาการ และการคุ้มครองข้อมูลส่วนบุคคล (PDPA)</span>
            </li>
          </ul>
        </section>

        {/* Target Audience */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            กลุ่มเป้าหมาย (Target Group)
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-slate-700">
            <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100">
              <strong className="text-purple-900 block mb-0.5">นักเรียนระดับมัธยมศึกษา (ตอนต้นและตอนปลาย)</strong>
              <p className="text-slate-600 text-xs">ผู้ที่ต้องการใช้ AI เป็นผู้ช่วยค้นคว้า ทำรายงาน และเตรียมตัวสอบอย่างปลอดภัย</p>
            </div>
            <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100">
              <strong className="text-blue-900 block mb-0.5">นักศึกษาระดับอุดมศึกษาและอาชีวศึกษา</strong>
              <p className="text-slate-600 text-xs">ผู้ที่ต้องการประยุกต์ใช้ AI ในโครงงานวิจัย เขียนโค้ด และเคารพมาตรฐานวิชาการ</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <strong className="text-slate-900 block mb-0.5">ครู อาจารย์ และผู้ปกครอง</strong>
              <p className="text-slate-600 text-xs">ใช้เป็นสื่อการสอนดิจิทัลเพื่อแนะแนวทางให้กับเยาวชนในยุคปัญญาประดิษฐ์</p>
            </div>
          </div>
        </section>
      </div>

      {/* Expected Benefits */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-600" />
          ประโยชน์ที่คาดว่าจะได้รับ (Expected Benefits)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <h4 className="font-bold text-slate-900">1. ยกระดับผลสัมฤทธิ์ทางการเรียนรู้</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              ผู้เรียนสามารถใช้ AI เพื่อขยายขอบเขตการค้นคว้าและทำความเข้าใจบทเรียนที่ซับซ้อนได้อย่างรวดเร็วและตรงจุด
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <h4 className="font-bold text-slate-900">2. ป้องกันภัยคุกคามทางไซเบอร์และการละเมิดสิทธิ</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              ลดโอกาสที่ข้อมูลส่วนบุคคลที่สำคัญจะถูกเปิดเผย และไม่ตกเป็นเหยื่อของการละเมิดทรัพย์สินทางปัญญา
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <h4 className="font-bold text-slate-900">3. ธำรงไว้ซึ่งมาตรฐานจริยธรรมทางวิชาการ</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              สร้างค่านิยมความซื่อสัตย์ การอ้างอิงที่มาอย่างโปร่งใส และการรับผิดชอบต่อผลงานของตนเอง
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <h4 className="font-bold text-slate-900">4. สร้างทักษะพลเมืองดิจิทัลแห่งอนาคต (Future Skills)</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              เตรียมความพร้อมกำลังคนรุ่นใหม่ให้สามารถทำงานร่วมกับ AI ได้อย่างชาญฉลาดและมีความเป็นมนุษย์ที่เข้มแข็ง
            </p>
          </div>
        </div>
      </section>

      {/* Verified Reference Sources */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            แหล่งข้อมูลอ้างอิงที่ตรวจสอบได้จริง (Verified References)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            เนื้อหาและแนวคิดในเว็บไซต์นี้อ้างอิงจากเอกสารและแนวปฏิบัติของหน่วยงานชั้นนำระดับประเทศและระดับสากล:
          </p>
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-2xl border border-slate-200 hover:border-purple-300 transition-colors bg-slate-50/50">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
                  สถาบันข้อมูลขนาดใหญ่ (BDI)
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-1">
                  AI Literacy: รู้เท่าทันปัญญาประดิษฐ์เพื่อการประยุกต์ใช้อย่างยั่งยืน
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  คลังความรู้ Big Data 101 ด้านความฉลาดรู้ปัญญาประดิษฐ์และการประยุกต์ใช้งาน
                </p>
              </div>
              <a
                href="https://bdi.or.th/big-data-101/ai-literacy/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white hover:bg-purple-50 text-purple-700 border border-slate-200 hover:border-purple-300 rounded-xl text-xs font-semibold shrink-0 transition-colors"
              >
                <span>เปิดอ่านต้นฉบับ</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 hover:border-purple-300 transition-colors bg-slate-50/50">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                  สำนักงานพัฒนาธุรกรรมทางอิเล็กทรอนิกส์ (ETDA)
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-1">
                  แนวทางการประยุกต์ใช้ปัญญาประดิษฐ์อย่างมีธรรมาภิบาล (AI Governance Framework for Thailand)
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  กรอบจริยธรรมปัญญาประดิษฐ์และความปลอดภัยทางดิจิทัลของประเทศไทย
                </p>
              </div>
              <a
                href="https://www.etda.or.th"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white hover:bg-indigo-50 text-indigo-700 border border-slate-200 hover:border-indigo-300 rounded-xl text-xs font-semibold shrink-0 transition-colors"
              >
                <span>เว็บไซต์ ETDA</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 hover:border-purple-300 transition-colors bg-slate-50/50">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                  UNESCO (องค์การยูเนสโก)
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-1">
                  Guidance for Generative AI in Education and Research & Ethics Recommendation
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  แนวทางการใช้ Generative AI ในการศึกษาและการวิจัยอย่างมีมนุษยธรรมและเคารพสิทธิมนุษยชน
                </p>
              </div>
              <a
                href="https://www.unesco.org/en/artificial-intelligence/recommendation-ethics"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white hover:bg-blue-50 text-blue-700 border border-slate-200 hover:border-blue-300 rounded-xl text-xs font-semibold shrink-0 transition-colors"
              >
                <span>เอกสาร UNESCO</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Action button */}
      <div className="text-center pt-2">
        <button
          onClick={() => onNavigate('lessons')}
          className="px-8 py-3.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-sm transition-all shadow-sm cursor-pointer"
        >
          เริ่มต้นเข้าสู่บทเรียนเพื่อการรู้เท่าทัน AI →
        </button>
      </div>
    </div>
  );
};
