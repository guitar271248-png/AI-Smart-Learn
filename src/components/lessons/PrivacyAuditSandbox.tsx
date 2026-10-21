import React, { useState } from 'react';
import { Shield, ShieldAlert, ShieldCheck, RefreshCw, KeyRound, UserCheck } from 'lucide-react';

interface PreloadSample {
  name: string;
  text: string;
}

const SAMPLES: PreloadSample[] = [
  {
    name: 'ตัวอย่างเสี่ยง: มีเลขบัตร ปชช. และเบอร์โทร',
    text: 'ช่วยร่างเรซูเม่ให้หน่อยครับ ผมชื่อ สมชาย ใจดี เลขบัตรประชาชน 1-1002-00345-67-8 เบอร์โทร 081-234-5678 เรียนจบ ม.6 โรงเรียนกรุงเทพฯ'
  },
  {
    name: 'ตัวอย่างเสี่ยง: มีรหัสผ่านและข้อมูลเซิร์ฟเวอร์',
    text: 'โปรแกรมนี้เชื่อมต่อฐานข้อมูลไม่ผ่าน ช่วยดูโค้ดให้หน่อย db_user: admin, db_pass: P@ssw0rd2026, ip: 192.168.1.100'
  },
  {
    name: 'ตัวอย่างปลอดภัย: ข้อมูลทั่วไปไม่มี PII',
    text: 'ช่วยแนะนำโครงสร้างการเขียนเรซูเม่สำหรับนักเรียน ม.6 ที่ต้องการยื่นพอร์ตฟอลิโอเข้าคณะวิศวกรรมศาสตร์ โดยมีหัวข้ออะไรบ้างที่ควรใส่'
  }
];

export const PrivacyAuditSandbox: React.FC = () => {
  const [inputText, setInputText] = useState(SAMPLES[0].text);
  const [scanResult, setScanResult] = useState<{
    safe: boolean;
    issues: string[];
    recommendation: string;
  } | null>(null);

  const handleScan = (textToScan: string) => {
    const text = textToScan || inputText;
    const issues: string[] = [];

    // Check 13-digit ID pattern or formatted ID
    if (/\d{1}-\d{4}-\d{5}-\d{2}-\d{1}/.test(text) || /\b\d{13}\b/.test(text) || /เลขบัตรประชาชน/i.test(text)) {
      issues.push('ตรวจพบ "หมายเลขบัตรประชาชน / PII อ่อนไหวสูง"');
    }

    // Check phone number
    if (/0\d{1,2}-?\d{3,4}-?\d{4}/.test(text) || /เบอร์โทร/i.test(text)) {
      issues.push('ตรวจพบ "หมายเลขโทรศัพท์ติดต่อส่วนบุคคล"');
    }

    // Check password pattern
    if (/password|pass|รหัสผ่าน|db_pass/i.test(text) && /[:=]/i.test(text)) {
      issues.push('ตรวจพบ "รหัสผ่าน หรือ Credentials เข้าระบบ"');
    }

    // Check financial
    if (/เลขบัญชี|บัตรเครดิต|cvv|otp/i.test(text)) {
      issues.push('ตรวจพบ "ข้อมูลทางการเงิน หรือ บัญชีธนาคาร"');
    }

    if (issues.length === 0) {
      setScanResult({
        safe: true,
        issues: [],
        recommendation: 'ข้อความนี้ปลอดภัย (Safe Prompt) ไม่มีข้อมูลส่วนบุคคลระบุตัวตน (Non-PII) สามารถส่งให้ AI ประมวลผลได้อย่างสบายใจ'
      });
    } else {
      setScanResult({
        safe: false,
        issues,
        recommendation: 'อันตราย! ควรถอดข้อมูลระบุตัวตนออกก่อน โดยใช้ข้อมูลจำลอง เช่น "[ใส่ชื่อ-นามสกุล]", "[ใส่เบอร์โทร]" แทนข้อมูลจริงเพื่อความปลอดภัยตามกฎหมาย PDPA'
      });
    }
  };

  const loadSample = (sample: PreloadSample) => {
    setInputText(sample.text);
    handleScan(sample.text);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <span className="text-xs font-semibold text-purple-600 tracking-wider">เครื่องมือทดสอบความปลอดภัย</span>
          <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2 mt-0.5">
            <Shield className="w-5 h-5 text-purple-600" />
            AI Privacy Scanner: ตรวจสอบข้อมูลส่วนบุคคล (PII) ก่อนส่งให้ AI
          </h4>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-slate-500">คลิกลองตัวอย่างข้อความ:</span>
          {SAMPLES.map((s, idx) => (
            <button
              key={idx}
              onClick={() => loadSample(s)}
              className="text-xs px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 hover:bg-purple-50 hover:border-purple-200 text-slate-700 transition-colors cursor-pointer"
            >
              {s.name}
            </button>
          ))}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            พิมพ์หรือวางข้อความคำสั่งที่ต้องการตรวจสอบ:
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={3}
            placeholder="ลองพิมพ์ข้อความคำสั่งของคุณที่นี่ เช่น ช่วยเขียนเรซูเม่..."
            className="w-full text-xs md:text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => handleScan(inputText)}
            className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs md:text-sm font-semibold transition-colors cursor-pointer flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            ตรวจสอบความปลอดภัยของข้อความนี้
          </button>
        </div>

        {scanResult && (
          <div className={`p-4 rounded-xl border transition-all ${
            scanResult.safe ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center gap-2 font-bold text-sm">
              {scanResult.safe ? (
                <>
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span className="text-emerald-900">ผลการตรวจ: ปลอดภัย ไม่พบข้อมูลอ่อนไหวส่วนบุคคล</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-5 h-5 text-red-600" />
                  <span className="text-red-950">ผลการตรวจ: เสี่ยงข้อมูลรั่วไหล! กรุณาแก้ไขก่อนส่ง</span>
                </>
              )}
            </div>

            {scanResult.issues.length > 0 && (
              <ul className="mt-2.5 space-y-1 text-xs text-red-800 font-medium">
                {scanResult.issues.map((iss, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                    {iss}
                  </li>
                ))}
              </ul>
            )}

            <p className="mt-2 text-xs md:text-sm leading-relaxed text-slate-700">
              {scanResult.recommendation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
