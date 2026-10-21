import React from 'react';
import { Sparkles, ExternalLink, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: About */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">AI Smart Learn</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              เว็บแอปพลิเคชันเพื่อการเรียนรู้ด้านปัญญาประดิษฐ์ (AI Literacy) สำหรับนักเรียนและนักศึกษา มุ่งสร้างความตระหนักรู้ การใช้ AI อย่างมีประสิทธิภาพ ปลอดภัย มีจริยธรรม และไม่พึ่งพาเครื่องมือจนสูญเสียทักษะการคิดวิเคราะห์
            </p>
            <div className="flex items-center gap-4 text-slate-500 text-[11px] pt-1">
              <span>มาตรฐานการศึกษาดิจิทัล</span>
              <span aria-hidden="true">·</span>
              <span>เพื่อการเรียนรู้ที่ไม่แสวงหากำไร</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 tracking-wider mb-3">แผนผังเว็บไซต์</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-purple-400 transition-colors cursor-pointer"
                >
                  หน้าแรก (Home)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('lessons')}
                  className="hover:text-purple-400 transition-colors cursor-pointer"
                >
                  บทเรียน 4 หมวดหมู่ (Lessons)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('mission')}
                  className="hover:text-purple-400 transition-colors cursor-pointer"
                >
                  เกมภารกิจนักสืบ AI (Mission)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('quiz')}
                  className="hover:text-purple-400 transition-colors cursor-pointer"
                >
                  แบบทดสอบ AI Literacy (Quiz)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="hover:text-purple-400 transition-colors cursor-pointer"
                >
                  ความก้าวหน้าการเรียนรู้ (Dashboard)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('auth')}
                  className="hover:text-purple-400 transition-colors cursor-pointer"
                >
                  เข้าสู่ระบบ / บัญชีผู้เรียน (Sign In)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Reference & Guidelines */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 tracking-wider mb-3">แหล่งข้อมูลอ้างอิง</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://bdi.or.th/big-data-101/ai-literacy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-purple-400 transition-colors"
                >
                  <span>BDI Big Data Institute</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.etda.or.th"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-purple-400 transition-colors"
                >
                  <span>ETDA AI Governance Guidelines</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.unesco.org/en/artificial-intelligence/recommendation-ethics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-purple-400 transition-colors"
                >
                  <span>UNESCO AI Ethics & Education</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-purple-400 hover:text-purple-300 font-medium cursor-pointer"
                >
                  อ่านรายละเอียดโครงงานทั้งหมด →
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} AI Smart Learn — เรียนรู้ AI ใช้อย่างฉลาด. สงวนลิขสิทธิ์เพื่อการศึกษา.</p>
          <p className="flex items-center gap-1 text-[11px]">
            สร้างสรรค์ด้วยความใส่ใจเพื่อเยาวชนไทยยุค AI
          </p>
        </div>
      </div>
    </footer>
  );
};
